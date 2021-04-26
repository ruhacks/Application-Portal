import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDTWIlRWCDwIQrhqK22HWhyNDFElUJ6mGs",
    authDomain: "ru-hacks-app-page.firebaseapp.com",
    databaseURL: "https://ru-hacks-app-page.firebaseio.com",
    projectId: "ru-hacks-app-page",
    storageBucket: "ru-hacks-app-page.appspot.com",
    messagingSenderId: "747202725161",
    appId: "1:747202725161:web:a07256c311f9451ad1e338",
    measurementId: "G-EQZRS2EGEE",
};

firebase.initializeApp(firebaseConfig);

// If emulating local firebase/firestore
if (process.env.NODE_ENV !== "production") {
    firebase.firestore().useEmulator("localhost", "4000");
    firebase.functions().useEmulator("localhost", "5001");
    firebase.auth().useEmulator("http://localhost:9099");
}

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
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
