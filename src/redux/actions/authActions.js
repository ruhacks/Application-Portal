/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { myFirebase } from '../../db/index';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export const VERIFICATION_LINK_SENT = 'VERIFICATION_LINK_SENT';
export const VERIFICATION_LINK_REQUEST = 'VERIFICATION_LINK_REQUEST';
export const VERIFICATION_LINK_ERROR = 'VERIFICATION_LINK_ERROR';

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

export const loginError = () => {
    return {
        type: LOGIN_FAILURE,
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

export const logoutError = () => {
    return {
        type: LOGOUT_FAILURE,
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

export const verificationLinkError = () => {
    return {
        type: VERIFICATION_LINK_ERROR,
    };
};

export const loginUser = (email, password) => (dispatch) => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(receiveLogin(user));
        })
        .catch((error) => {
            //Do something with the error if you want!
            console.log(error);
            dispatch(loginError());
        });
};

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch((error) => {
            dispatch(logoutError());
        });
};

export const verifyAuth = () => (dispatch) => {
    dispatch(requestVerify());
    myFirebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
            dispatch(receiveLogin(user));
        }
        dispatch(receiveVerify(user));
    });
};

export const resendVerificationLink = () => (dispatch) => {
    dispatch(verificationRequest());
    myFirebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
            dispatch(verificationSend());
        });
};
