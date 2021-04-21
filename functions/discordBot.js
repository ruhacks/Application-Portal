const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const {validateDiscordBot} = require("./ValidateDiscordBot");

const firestore = admin.firestore();

const discordCheck = express(cors);

discordCheck.use(cors({origin: true}));
discordCheck.use(validateDiscordBot);
discordCheck.get("/config", async (req, res) => {
  return res.status(200).send(config);
});
discordCheck.get("/user/:uid", async (req, res) => {
  if (!req.params.uid) return res.status(400).send({message: "Empty request"});

  const requestUID = req.params.uid;

  const confs = firestore.collection("confirmation");
  let snapshot;
  try {
    snapshot = await confs.where("discord", "==", requestUID).get();
  } catch (error) {
    res.status(500).send({message: "Firestore error!", error});
  }

  if (snapshot.empty) {
    return res.status(404).send({user: false, message: "No user found"});
  } else if (snapshot.size > 1) {
    return res.status(500).send({user: false, message: "Multiple users found matching discord ID"});
  }

  let fireID = "";

  snapshot.forEach((doc) => {
    fireID = doc.id;
  });

  const userRef = firestore.doc(`users/${fireID}/application/fields`);
  let userSnap;
  try {
    userSnap = await userRef.get();
  } catch (error) {
    res.status(500).send({message: "Firestore error!", error});
  }

  const user = userSnap.data();

  const {email, name, pronouns} = user;
  console.log(pronouns);

  console.log(user);

  return res.status(200).send({user: {
    email,
    name,
    pronouns,
    requestUID,
  }});
});

const config = {
  pronounsOptions: [
    "He/Him",
    "She/Her",
    "They/Them",
    "Prefer not to answer",
    "Other (please specify)",
  ],
};

module.exports = {discordCheck};
