/*                                  index.js (reducers)
Description:    This is where we combine all of our reducers into one export when initializing our redux store
                Notable things that happen here:
                    -   export combined reducers for initialization of the store
                     
*/
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./auth";
import register from "./register";
import app from "./app";
import confirmation from "./confirmation";
import admin from "./admin";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth,
    register,
    app,
    confirmation,
    admin,
});
