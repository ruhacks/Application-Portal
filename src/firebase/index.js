import firebase from "firebase/app";
import dotenv from "dotenv";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

dotenv.config({ silent: true });

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// If emulating local firebase/firestore
//firebase.firestore().useEmulator("localhost", "4000");
//firebase.functions().useEmulator("localhost", "5001");

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const userProfileDefault = {
    confirmation: {
        discord: "",
        pNum: "",
    },
    status: {
        admitted: false,
        checkedIn: false,
        completeProfile: false,
        confirmed: false,
        declined: false,
        isMentor: false,
        reimbursmentGiven: false,
        rejected: false,
        timestampAdmitted: "",
    },
};
