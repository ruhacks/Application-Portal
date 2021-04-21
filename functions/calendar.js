const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const {validateFirebaseIdToken} = require("./ValidateFirebase");


const firestore = admin.firestore();

const calendar = express(cors);

calendar.use(cors({origin: true}));
calendar.use(validateFirebaseIdToken);

calendar.post("/create", async (req, res) => {
  const {uid} = req.user;
  const eventInfo = req.body.eventInfo;
  const day = req.body.day;
  let adminUserDocSnap;
  try {
    adminUserDocSnap = await firestore.doc(`admins/${uid}`).get();
  } catch (error) {
    return res.status(500).send({message: "Error getting admin data", eventAdded: false, error});
  }

  if (!adminUserDocSnap.exists) return res.status(401).send({message: "Error! Unauthorized to do this action", eventAdded: false});

  let databaseDay;

  switch (day) {
    case "DAY_FRI":
      databaseDay = "DAY_ONE";
      break;
    case "DAY_SAT":
      databaseDay = "DAY_TWO";
      break;
    case "DAY_SUN":
      databaseDay = "DAY_THREE";
      break;
    default:
      return res.status(400).send({message: "Error! Invalid day provided", eventAdded: false});
  }

  const calendarEventCollection = firestore.collection(`calendar/${databaseDay}/events`);
  let eventAddition;
  try {
    eventAddition = await calendarEventCollection.add(eventInfo);
  } catch (error) {
    return res.status(500).send({message: "Error adding event to day in calendar", error, eventAdded: false});
  }
  return res.status(200).send({message: "Successfully added event", eventAdded: true, eventID: eventAddition.id});
});

calendar.post("/edit", async (req, res) => {
  const {uid} = req.user;
  const eventInfo = req.body.eventInfo;
  const day = req.body.day;
  const ID = req.body.ID;
  let adminUserDocSnap;
  try {
    adminUserDocSnap = await firestore.doc(`admins/${uid}`).get();
  } catch (error) {
    return res.status(500).send({message: "Error getting admin data", eventEdited: false, error});
  }

  if (!adminUserDocSnap.exists) return res.status(401).send({message: "Error! Unauthorized to do this action", eventEdited: false});

  let databaseDay;

  switch (day) {
    case "DAY_FRI":
      databaseDay = "DAY_ONE";
      break;
    case "DAY_SAT":
      databaseDay = "DAY_TWO";
      break;
    case "DAY_SUN":
      databaseDay = "DAY_THREE";
      break;
    default:
      return res.status(400).send({message: "Error! Invalid day provided", eventEdited: false});
  }

  const calendarEventRef = firestore.doc(`calendar/${databaseDay}/events/${ID}`);
  let eventAddition;
  try {
    eventAddition = await calendarEventRef.update(eventInfo);
  } catch (error) {
    return res.status(500).send({message: "Error editing event to day in calendar", error, eventEdited: false});
  }
  return res.status(200).send({message: "Successfully edited event", eventEdited: true, eventID: eventAddition.id});
});


module.exports = {calendar};
