const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const {validateFirebaseIdToken} = require("./ValidateFirebase");
const discord = require("./discord.json");
const functions = require("firebase-functions");


const firestore = admin.firestore();

const verifyToGetDiscordURL = express();
verifyToGetDiscordURL.use(cors({origin: true}));
verifyToGetDiscordURL.use(validateFirebaseIdToken);
verifyToGetDiscordURL.get("/", async (req, res)=>{
  const {uid} = req.user;
  firestore.doc(`users/${uid}/status/fields`).get().then((profile) => {
    if (!profile.data().admitted) res.send("ERROR: INVALID STATE");

    firestore.doc(`confirmation/${uid}`).get().then((conf) => {
      if (!conf.data().token) res.send("CANNOT FORM URL");
      let redirectURL = "http://localhost:5001/ru-hacks-app-page/us-central1/discord/callback";
      process.env.GCLOUD_PROJECT = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
      if (process.env.GCLOUD_PROJECT) {
        redirectURL = `https://${functions.config().func_region.value}-${functions.config().gcp_project.value}.cloudfunctions.net/discord/callback`;
      }

      const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectURL)}&response_type=code&scope=identify%20email&state=${conf.data().token}`;
      res.send({
        url,
      });
    });
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = {verifyToGetDiscordURL};
