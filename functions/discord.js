const admin = require("firebase-admin");
const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const DiscordOauth2 = require("discord-oauth2");
const discord = require("./discord.json");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./JWT.json");


const backToConfirmation = "https://app.ruhacks.com/confirmation"; // CHANGE THIS FOR PROD************************************************

const secret = jwtConfig.secret;


const firestore = admin.firestore();

const discordApp = express(cors);
const discordOauth = new DiscordOauth2();

discordApp.use(cors({origin: true}));
discordApp.get("/callback", async (req, res) => {
  if (!req.query.code || !req.query.state) res.send("error!");
  const transferToken = req.query.state;
  const payload = await jwt.verify(transferToken, secret);

  const {userKey, uid} = payload;

  const confUser = await firestore.doc(`/confirmation/${uid}/verify/fields`).get();
  if (confUser.exists) {
    const conf = confUser.data();
    if (!conf.ID || conf.ID !== userKey) {
      res.redirect(backToConfirmation+"?invalidKey=true");
    }
  }

  const code = req.query.code;


  let redirectURL = "http://localhost:5001/ru-hacks-app-page/us-central1/discord/callback";
  process.env.GCLOUD_PROJECT = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
  if (process.env.GCLOUD_PROJECT) {
    redirectURL = `https://${functions.config().func_region.value}-${functions.config().gcp_project.value}.cloudfunctions.net/discord/callback`;
  }
  const data = {
    clientId: discord.DISCORD_CLIENT_ID,
    clientSecret: discord.DISCORD_SECRET,

    code: code,
    scope: "identify email",
    grantType: "authorization_code",

    redirectUri: redirectURL,
  };
  const tokeReq = await discordOauth.tokenRequest(data);
  const accessToken = tokeReq.access_token;

  const discordUser = await discordOauth.getUser(accessToken);


  const confRef = firestore.doc(`confirmation/${uid}`);
  const userRef = firestore.doc(`users/${uid}/status/fields`);

  const statusProfile = await userRef.get();

  if (statusProfile.exists) {
    const stats = statusProfile.data();
    if (stats.admitted) {
      const confirmation = await confRef.get();

      if (confirmation.exists) {
        await confRef.update({discord: discordUser.id});
        res.redirect(backToConfirmation+"?fromDiscord=true");
      }
    }
  }
});

module.exports = {discordApp};
