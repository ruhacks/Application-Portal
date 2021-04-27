const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const {validateFirebaseIdToken} = require("./ValidateFirebase");

const firestore = admin.firestore();

const adminCheck = express(cors);

adminCheck.use(cors({origin: true}));
adminCheck.use(validateFirebaseIdToken);

adminCheck.get("/verify", async (req, res) => {
  if (!req.user) res.send("ERROR! Invalid User!");

  const adminDoc = firestore.doc(`admins/${req.user.uid}`);

  const snapshot = await adminDoc.get();

  if (snapshot.exists) {
    res.send({admin: true, uid: req.user.uid});
  } else {
    res.send({admin: false});
  }
});

module.exports = {adminCheck};
