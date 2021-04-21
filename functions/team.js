/* eslint-disable camelcase */
const admin = require("firebase-admin");
const rand = require("random-key");
const {uniqueNamesGenerator, adjectives, colors, animals} = require("unique-names-generator");

const express = require("express");
const cors = require("cors");

const {validateFirebaseIdToken} = require("./ValidateFirebase");

const FieldValue = admin.firestore.FieldValue;
const firestore = admin.firestore();


const team = express();
team.use(cors({origin: true}));
team.use(validateFirebaseIdToken);

team.post("/create", async (req, res) =>{
  const {uid} = req.user;
  console.log(req.body);
  const userRef = firestore.doc(`users/${uid}`);
  let userSnapshot;
  try {
    userSnapshot = await userRef.get(); // get user doc to determine if user already has group
  } catch (error) {
    return res.status(500).send({message: "Error getting user info", error}); // throw error if user doesn't exist or there's an error
  }

  if (userSnapshot) {
    const userData = userSnapshot.data(); // get user data from doc
    if (!userData) res.status(500).send({message: "No user data found"});
    if (userData.team_ID) {
      return res.status(200).send({message: "User already in a group", team_ID: false}); // Respond if user is already in a group
    }

    const team_ID = rand.generate(32); // Gen team ID
    const team_name = req.body.team_name || uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]}); // if team name provided use that one or else make one up randomly from an adjective, color and animal
    const teamRef = firestore.doc(`teams/${team_ID}`); // Create team ref

    try {
      await teamRef.set({
        [uid]: {
          email: userData.email,
          owner: true,
        },
        team_name,
      }); // set team
    } catch (error) {
      return res.status(500).send({message: "Error setting team data", error}); // Throw error if there's a problem setting team
    }

    try {
      await userRef.update({
        team_ID,
      }); // update user with team ID
    } catch (error) {
      return res.status(500).send({message: "Error setting Team ID for user", error}); // Throw error if there's a problem setting team ID
    }

    return res.status(200).send({message: "Team Created", team_ID}); // Respond with team ID and message indicating team is created
  } else {
    return res.status(500).send({message: "No user found", teamJoined: false, userUpdated: false}); // if there's a problem finding the user
  }
});

team.get("/delete/:ID", async (req, res)=>{
  const {uid} = req.user;
  if (!req.params.ID) return res.status(400).send({message: "No team ID provided"});
  const ID = req.params.ID;
  const teamRef = firestore.doc(`teams/${ID}`);
  console.log(`teams/${ID}`);
  const getUserRef = (user_ID) => firestore.doc(`users/${user_ID}`);

  let teamSnap;
  const errors = [];

  try {
    teamSnap = await teamRef.get(); // get team doc snapshot
  } catch (error) {
    return res.status(500).send({message: "Error getting team ID", error}); // respond with error if there's a problem getting team
  }
  if (teamSnap.exists) {
    const teamInfo = teamSnap.data(); // get team data
    if (teamInfo && teamInfo[uid] && teamInfo[uid].owner) { // if user trying to delete is team owner
      const userIDsInGroup = Object.keys(teamInfo).filter((key) => key !== "team_name"); // get all user IDs in team

      // For each user
      const asyncDelete = userIDsInGroup.map(async (user_ID) => {
        const user_ref = getUserRef(user_ID); // get ref
        const user_snap = await user_ref.get(); // get snap
        const user_data = user_snap.data(); // pull data

        if (user_data && user_data.team_ID && user_data.team_ID === ID) { // if user team ID matches current team
          await user_ref.update({team_ID: FieldValue.delete()}); // delete team ID from user document
        } else {
          errors.push({message: "Error removing "+user_data.email+" from the team ( "+user_ID+" )"});
        }
      });
      try {
        await Promise.all(asyncDelete); // wait to delete all users
      } catch (error) {
        errors.push(error);
      }

      try {
        teamRef.delete(); // delete team doc
      } catch (error) {
        return res.status(500).send({message: "Error deleting team document", teamDeleted: false, error}); // error deleting team doc
      }
    } else {
      return res.status(401).send({message: "User is not authorized to delete", teamDeleted: false}); // throw error if user doesn't exist or there's an error
    }
    if (errors.length > 0 ) {
      return res.status(500).send({message: "There were errors with deleting the team", errors, teamDeleted: false});
    }
    return res.status(200).send({message: "Team Deleted", teamDeleted: true}); // Respond with team ID and message indicating team is created
  } else {
    return res.status(500).send({message: "No team found", teamJoined: false, userUpdated: false}); // if there's a problem finding the team
  }
});

team.get("/join/:ID", async (req, res) => {
  const {uid} = req.user;
  const ID = req.params.ID;

  const userRef = firestore.doc(`users/${uid}`);
  const teamRef = firestore.doc(`teams/${ID}`);

  let teamSnap; let userSnap;

  try {
    teamSnap = await teamRef.get(); // get team doc snapshot
  } catch (error) {
    return res.status(500).send({message: "Error getting team ID", error}); // respond with error if there's a problem getting team
  }


  try {
    userSnap = await userRef.get(); // get user doc snapshot
  } catch (error) {
    res.status(500).send({message: "Error getting user info", error}); // throw error if user doesn't exist or there's an error
  }

  if (teamSnap.exists && userSnap.exists) {
    const teamInfo = teamSnap.data(); // get team data
    const userInfo = userSnap.data(); // get user data

    if (userInfo.team_ID) {
      return res.status(200).send({message: "User already in a group", team_ID: false}); // Respond if user is already in a group
    }

    let userCount = 0;
    if (Object.keys(teamInfo).includes(uid)) return res.status(200).send({message: "Alread on team", teamJoined: false, userUpdated: false}); // if user is already on the team respond indicating so
    Object.keys(teamInfo).forEach((person_ID) => {
      if (person_ID !== "team_name") {
        userCount++;
      }
    });
    // make sure that there's less than 4 people on the team
    if (userCount >= 4) {
      return res.status(200).send({message: "Team is full", teamJoined: false, userUpdated: false});
    }

    try {
      await teamRef.update({
        [uid]: {
          email: userInfo.email,
          owner: false,
        },
      }); // if we're good to go, update the team with the new user
    } catch (error) {
      return res.status(500).send({message: "Error updating team", teamJoined: false, userUpdated: false}); // if there's a problem updating team respond
    }

    try {
      await userRef.update({
        team_ID: ID,
      }); // update user with team ID
    } catch (error) {
      return res.status(500).send({message: "Error updating user with team", teamJoined: true, userUpdated: false}); // if there's a problem updating user respond
    }

    return res.status(200).send({message: "Team joined successfully", teamJoined: true, userUpdated: true}); // Successfully joined!
  } else {
    if (!teamSnap.exists) res.status(404).send({message: "No team found", teamJoined: false, userUpdated: false}); // if there's a problem finding the team
    if (!userSnap.exists) res.status(404).send({message: "No user found", teamJoined: false, userUpdated: false}); // if there's a problem finding the user
  }
});

team.get("/leave/:ID", async (req, res) => {
  const {uid} = req.user;
  const ID = req.params.ID;

  const userRef = firestore.doc(`users/${uid}`);
  const teamRef = firestore.doc(`teams/${ID}`);

  let teamSnap;
  let userSnap;

  try {
    teamSnap = await teamRef.get(); // get team snapshot
  } catch (error) {
    return res.status(500).send({message: "Error getting team ID", error}); // if there's a problem getting team respond like so
  }

  try {
    userSnap = await userRef.get(); // get user doc snapshot
  } catch (error) {
    res.status(500).send({message: "Error getting user info", error}); // throw error if user doesn't exist or there's an error
  }


  if (teamSnap.exists && userSnap.exists) {
    const teamInfo = teamSnap.data(); // Get team data
    const userData = userSnap.data(); // Get user data
    if (!teamInfo) return res.status(404).send({message: "Team not found", teamLeft: false, userUpdated: false}); // Respond if team not found
    if (!userData || !userData.team_ID || userData.team_ID !== ID) return res.status(200).send({message: "User not in group", teamLeft: false, userUpdated: false}); // Respond if team not found


    const updatedObj = {team_name: teamInfo.team_name}; // create updated team object
    Object.keys(teamInfo).forEach((person_ID) => {
      if (person_ID !== "team_name" && person_ID !== uid) {
        updatedObj[uid] = teamInfo[person_ID]; // place all users except leaving user back
      }
    });
    if (Object.keys(updatedObj).length === 1) {
      try {
        await teamRef.delete(); // Delete team object if only person on team
      } catch (error) {
        return res.status(500).send({message: "Error updating team", teamLeft: false, userUpdated: false}); // respond if there's a problem setting team object
      }
    } else {
      try {
        await teamRef.set(updatedObj); // set team to the updated team object
      } catch (error) {
        return res.status(500).send({message: "Error updating team", teamLeft: false, userUpdated: false}); // respond if there's a problem setting team object
      }
    }


    try {
      await userRef.update({
        team_ID: FieldValue.delete(), // delete team ID from user doc
      });
    } catch (error) {
      return res.status(500).send({message: "Error updating user with team", teamLeft: true, userUpdated: false});
    }

    return res.status(200).send({message: "Team left successfully", teamLeft: true, userUpdated: true});
  } else {
    if (!teamSnap.exists) res.status(500).send({message: "No team found", teamJoined: false, userUpdated: false}); // if there's a problem finding the team
    if (!userSnap.exists) res.status(500).send({message: "No user found", teamJoined: false, userUpdated: false}); // if there's a problem finding the user
  }
});

team.post("/kick", async (req, res) => {
  const {uid} = req.user; // Get UID of user that requested to kick another user
  const ID = req.body.ID; // Get team ID

  const uidToKick = req.body.kickID; // Pull uid to kick

  if (uidToKick === uid) {
    return res.status(500).send({message: "Can't kick self"}); // if there's a problem getting team respond like so
  }

  const userRef = (user_ID) => firestore.doc(`users/${user_ID}`);
  const teamRef = firestore.doc(`teams/${ID}`);

  let teamSnap;
  let kickedUserSnap;
  let reqUserSnap;

  try {
    teamSnap = await teamRef.get(); // get team snapshot
  } catch (error) {
    return res.status(500).send({message: "Error getting team ID", error}); // if there's a problem getting team respond like so
  }

  try {
    kickedUserSnap = await userRef(uidToKick).get(); // get user doc snapshot of user TO KICK
  } catch (error) {
    res.status(500).send({message: "Error getting user info", error}); // throw error if user doesn't exist or there's an error
  }

  try {
    reqUserSnap = await userRef(uid).get(); // get user doc snapshot of TEAM OWNER
  } catch (error) {
    res.status(500).send({message: "Error getting user info", error}); // throw error if user doesn't exist or there's an error
  }

  if (kickedUserSnap.exists && teamSnap.exists && reqUserSnap.exists) { // Only continue if both user to kick and team exists
    const teamDat = teamSnap.data(); // team data
    const userDat = kickedUserSnap.data(); // kicked user data
    const reqUserDat = reqUserSnap.data(); // requested user data

    const updatedObj = {team_name: teamDat.team_name}; // create updated team object
    if (teamDat && teamDat[uid] && teamDat[uid].owner && userDat.team_ID && userDat.team_ID === ID && reqUserDat.team_ID && reqUserDat.team_ID === ID) {
      if (teamDat[uidToKick]) {
        Object.keys(teamDat).forEach((person_ID) => {
          if (person_ID !== "team_name" && person_ID !== uidToKick) {
            updatedObj[uid] = teamDat[person_ID]; // place all users except kicked user back
          }
        });
        try {
          await teamRef.set(updatedObj); // set team to the updated team object
        } catch (error) {
          return res.status(500).send({message: "Error updating team", userKicked: false, userUpdated: false}); // respond if there's a problem setting team object
        }

        try {
          await userRef(uidToKick).update({
            team_ID: FieldValue.delete(), // delete team ID from user doc
          });
        } catch (error) {
          return res.status(500).send({message: "Error updating user with team", userKicked: true, userUpdated: false});
        }

        return res.status(200).send({message: "User successfully kicked", userKicked: true, userUpdated: true});
      }
    } else {
      return res.status(500).send({message: "Error looking at team!", userKicked: false, userUpdated: false});
    }
  }
});

module.exports = {team};
