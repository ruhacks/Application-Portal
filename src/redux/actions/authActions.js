/*                                  authActions.js
Description:    Initialize action strings, action functions that returns action objects to the reducer (redux/reducers/auth.js) and action functions that actually does the work needed.
                Notable things that happen here:
                    -   Dispatch various action functions that dispatches actions that get sent to the reducer which changes 

                     
*/

import { auth, firestore } from "../../firebase";
import { profileUpdateObject } from "../../js/config/defaultState";

// Action strings
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const VERIFICATION_LINK_SENT = "VERIFICATION_LINK_SENT";
export const VERIFICATION_LINK_REQUEST = "VERIFICATION_LINK_REQUEST";
export const VERIFICATION_LINK_ERROR = "VERIFICATION_LINK_ERROR";

export const FORGOT_REQUEST = "FORGOT_REQUEST";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const FORGOT_FAILURE = "FORGOT_FAILURE";

export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const SET_PROFILE = "SET_PROFILE";
export const ERROR_PROFILE = "ERROR_PROFILE";

//action functions that returns action objects to the reducer (redux/reducers/auth.js) so the reducer knows how to adjust the variables

export const requestForgotPassword = () => {
    return {
        type: FORGOT_REQUEST,
    };
};

export const receiveForgotPassword = () => {
    return {
        type: FORGOT_SUCCESS,
    };
};

export const ForgotPasswordError = (error = {}) => {
    return {
        type: FORGOT_FAILURE,
        error,
    };
};

export const requestLogin = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

export const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
};

export const requestProfile = () => {
    return {
        type: REQUEST_PROFILE,
    };
};

export const setProfile = (profile, userInfo = {}) => {
    return {
        type: SET_PROFILE,
        profile,
        userInfo,
    };
};

export const errorProfile = (error) => {
    return {
        type: ERROR_PROFILE,
        error,
    };
};

export const loginError = (error) => {
    return {
        type: LOGIN_FAILURE,
        error,
    };
};

export const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

export const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

export const logoutError = (error = {}) => {
    return {
        type: LOGOUT_FAILURE,
        error,
    };
};

export const requestVerify = () => {
    return {
        type: VERIFY_REQUEST,
    };
};

export const receiveVerify = () => {
    return {
        type: VERIFY_SUCCESS,
    };
};

export const requestRegister = () => {
    return {
        type: VERIFY_SUCCESS,
    };
};

export const verificationRequest = () => {
    return {
        type: VERIFICATION_LINK_REQUEST,
    };
};

export const verificationSend = () => {
    return {
        type: VERIFICATION_LINK_SENT,
    };
};

export const verificationLinkError = (error = {}) => {
    return {
        type: VERIFICATION_LINK_ERROR,
        error,
    };
};

// The functions that do the work when called upon and the ones that dispatches actions to the reducer at various stages

//Attempts to login the user
export const loginUser = (email, password) => (dispatch) => {
    dispatch(requestLogin()); //Dispatches the LOGIN_REQUEST event to the reducer to change redux store state variables
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            //Once we get a successful login, dispatch the action that acknowledges that we've received a valid user and dispatches LOGIN_SUCCESS action in the reducer
            dispatch(receiveLogin(userCredential.user));
        })
        .catch((error) => {
            // Received error and dispatch LOGIN_ERROR action in the reducer
            dispatch(loginError(error));
        });
};

// Logs out the current user
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout()); //Dispatches the LOGOUT_REQUEST event to the reducer to change redux store state variables
    auth.signOut()
        .then(() => {
            // Once we get a successful logout, dispatch the action that acknowledges we've logged out a valid user and dispatches LOGOUT_SUCCESS event
            dispatch(receiveLogout());
        })
        .catch((error) => {
            // Received error and dispatch LOGOUT_ERROR action in the reducer
            dispatch(logoutError());
        });
};

// Verify if we have a user logged in already (used in protected Route and on inital app entry)
export const verifyAuth = () => (dispatch) => {
    dispatch(requestVerify());
    auth.onAuthStateChanged((user) => {
        if (user !== null) {
            dispatch(receiveLogin(user));
        }
        dispatch(receiveVerify(user));
    });
};

// Resends verification link for the current logged in user from the home page
export const resendVerificationLink = () => (dispatch) => {
    dispatch(verificationRequest());
    auth.currentUser.sendEmailVerification().then(() => {
        dispatch(verificationSend());
    });
};

// Sends Forgot Password link to user's email

export const sendForgotPassword = (email) => (dispatch) => {
    dispatch(requestForgotPassword());
    auth.sendPasswordResetEmail(email)
        .then(() => {
            dispatch(receiveForgotPassword());
        })
        .catch((error) => {
            dispatch(ForgotPasswordError(error));
        });
};

//******************************************************************************************** */

export const subscribeToUserProfile = (setUnsubscribe) => async (dispatch) => {
    const user = auth.currentUser;

    if (!user || Object.keys(user).length === 0) return;
    dispatch(requestProfile());
    const { uid } = user;
    const userRef = firestore.doc(`users/${uid}/status/fields`);
    const userInfoRef = firestore.doc(`users/${uid}`);
    let userInfoSnap, userInfo;

    try {
        userInfoSnap = await userInfoRef.get();
    } catch (error) {
        dispatch(errorProfile(error));
    }

    if (userInfoSnap) {
        userInfo = userInfoSnap.data();
    }

    const unsubscribe = userRef.onSnapshot((profile) => {
        if (profile.exists) {
            dispatch(setProfile(profile.data(), userInfo));
        } else {
            const currentTime = new Date();
            const newProfile = profileUpdateObject(currentTime);
            dispatch(setProfile(newProfile)); //if profile doesn't exist it's probably because we're provisioning it!
        }
    });
    setUnsubscribe(unsubscribe);
};
/* 
From here you can go to:
    -   auth.js in src/redux/reducers/auth.js to see the reducer and how it works if you haven't seen it
*/
