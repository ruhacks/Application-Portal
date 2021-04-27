const admin = require("firebase-admin");
admin.initializeApp();

const functions = require("firebase-functions");
const jwt = require("jsonwebtoken");
const rand = require("random-key");
const jwtConfig = require("./JWT.json");
const {discordApp} = require("./discord");
const {verifyToGetDiscordURL} = require("./GenDiscordURL");
const {adminCheck} = require("./admin");
const {discordCheck} = require("./discordBot");
const {team} = require("./team");


const secret = jwtConfig.secret;

const firestore = admin.firestore();

const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);

exports.discord = functions.https.onRequest(discordApp);
exports.discordCheck = functions.https.onRequest(discordCheck);
exports.getURL = functions.https.onRequest(verifyToGetDiscordURL);
exports.admin = functions.https.onRequest(adminCheck);
exports.team = functions.https.onRequest(team);


const statusDefault = {
  admitted: false,
  checkedIn: false,
  completedProfile: false,
  confirmed: false,
  declined: false,
  isMentor: false,
  reimbursmentGiven: false,
  rejected: false,
  name: "",
};

exports.handleNewSignups = functions.auth.user().onCreate(async (user) => {
  const {email, uid} = user;
  const createdAt = new Date();

  const batch = firestore.batch();

  const userRef = firestore.doc(`users/${uid}`);
  const userStatusFields = firestore.doc(`users/${uid}/status/fields`);
  const userStats = firestore.doc("users/--stats--");

  batch.set(userRef, {email, createdAt});
  batch.set(userStatusFields, statusDefault);
  batch.update(userStats, {count: increment});

  return batch.commit();
});


exports.handleDeletedUser = functions.auth.user().onDelete(async (user) => {
  const {uid} = user;


  const batch = firestore.batch();

  const userRef = firestore.doc(`users/${uid}`);
  const userStatusFields = firestore.doc(`users/${uid}/status/fields`);
  const userStats = firestore.doc("users/--stats--");

  const appRef = firestore.doc(`users/${uid}/application/fields`);
  const confRef = firestore.doc(`confirmation/${uid}`);

  batch.update(userStats, {count: decrement});
  batch.delete(userStatusFields);
  batch.delete(userRef);

  await batch.commit();


  const app = await appRef.get();
  const conf = await confRef.get();


  if (app.exists) await appRef.delete();
  if (conf.exists) await confRef.delete();

  return true;
});


exports.setCompleteStatus = functions.firestore
    .document("users/{userID}/application/fields")
    .onWrite(async (change, context) =>{
      const uid = context.params.userID;
      const fieldRef = firestore.doc(`users/${uid}/status/fields`);

      let name;

      if (change && change.after && change.after.exists && change.after.data().name) {
        name = change.after.data().name;
      }
      if (!change.before.exists) {
        const statRef = firestore.doc("applications/--stats--");

        await statRef.update({count: increment});
      }

      if (name) {
        return fieldRef
            .update({completedProfile: true, name})
            .catch((error) => console.error(error));
      } else {
        return fieldRef
            .update({completedProfile: true})
            .catch((error) => console.error(error));
      }
    });

exports.profileListener = functions.firestore
    .document("users/{userID}/status/fields")
    .onUpdate(async (change, context) => {
      const uid = context.params.userID;
      if (uid === "--stats--") return false;
      if (
        change.before &&
        change.after &&
        change.before.exists &&
        change.after.exists) {
        const {before, after} = change;

        const statusBefore = before.data();
        const statusAfter = after.data();


        if (statusBefore &&
            statusAfter &&
            statusBefore.admitted === false &&
            statusAfter.admitted === true ) {
          const oneTimeKey = rand.generate(256);

          const token = createTokenForUser(uid, oneTimeKey);

          const batch = firestore.batch();

          const confDoc = firestore.doc(`confirmation/${uid}`);
          const confKeyDoc = firestore.doc(`confirmation/${uid}/verify/fields`);
          const statusDoc = firestore.doc(`users/${uid}/status/fields`);

          batch.update(statusDoc, {rejected: false});

          batch.set(confDoc, {
            discord: "",
            pNum: "",
            token,
          });

          batch.set(confKeyDoc, {
            ID: oneTimeKey,
            firstTime: true,
          });

          try {
            await batch.commit();
            return true;
          } catch (err) {
            return (err);
          }
        } else if (statusAfter.rejected === true && statusBefore.admitted === true ) {
          const statusRef = firestore.doc(`users/${uid}/status/fields`);
          const confDoc = firestore.doc(`confirmation/${uid}`);
          try {
            await statusRef.update({admitted: false});
            await confDoc.delete();
            console.log("Done updating...");
          } catch (error) {
            throw new Error("Error changing status");
          }
        } else {
          return "Invalid request";
        }
      }
    });


exports.confListen = functions.firestore
    .document("confirmation/{userID}")
    .onUpdate(async (change, context)=>{
      const uid = context.params.userID;
      if (uid === "--stats--") return false;
      const {before, after} = change;

      if (!before.data()) return false;

      if (before.data().discord !== after.data().discord) {
        const oneTimeKey = rand.generate(256);
        const token = createTokenForUser(uid, oneTimeKey);

        const confRef = firestore.doc(`confirmation/${uid}`);
        const confKeyRef = firestore.doc(`confirmation/${uid}/verify/fields`);
        const confStats = firestore.doc("confirmation/--stats--");

        const confirmationBatch = firestore.batch();

        confirmationBatch.update(confRef, {token});
        confirmationBatch.update(confKeyRef, {ID: oneTimeKey, firstTime: false});
        if (!before.data().discord || before.data().discord === "") confirmationBatch.update(confStats, {count: increment});

        await confirmationBatch.commit();

        if (!before.data().discord || before.data().discord === "") {
          const usersBatch = firestore.batch();

          const statsRef = firestore.doc("users/--stats--");
          const profileRef = firestore.doc(`users/${uid}/status/fields`);

          usersBatch.update(statsRef, {countConfirmed: increment});
          usersBatch.update(profileRef, {confirmed: true});

          await usersBatch.commit();
          return true;
        }
      } else {
        return false;
      }
    });

exports.adminListenCreate = functions.firestore
    .document("admins/{userID}")
    .onCreate((_, context) => {
      const uid = context.params.userID;
      const profileRef = firestore.doc(`/users/${uid}/status/fields`);
      return profileRef.get().then((snapshot) => {
        if (snapshot.exists) {
          profileRef.set({isAdmin: true}, {merge: true});
        }
      });
    });

exports.adminListenDelete = functions.firestore
    .document("admins/{userID}")
    .onDelete((_, context) => {
      const uid = context.params.userID;
      const profileRef = firestore.doc(`/users/${uid}/status/fields`);
      return profileRef.get().then((snapshot) => {
        if (snapshot.exists) {
          profileRef.set({isAdmin: false}, {merge: true});
        }
      });
    });

/**
 * Generates a JWT for a user
 * @param {String} uid User UID
 * @param {String} userKey Generated user key
 * @return {String} JWT token
 */
function createTokenForUser(uid, userKey) {
  const payload = {
    uid,
    userKey,
    iat: new Date().getTime(),
  };
  return jwt.sign(payload, secret);
}
