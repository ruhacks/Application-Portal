/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { myFirebase } from '../../db/index';

export const REGISTER_REQUEST = 'REGISTER REQUEST';
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL';

export const REGISTER_ERROR = 'REGISTER_ERROR';

export const VERIFICATION_REQUEST = 'VERIFIACTION_REQUEST';
export const VERIFICATION_SUCCESSFULLY_SENT = 'VERIFICATION_SUCCESSFULLY_SENT';

export const requestRegister = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

export const registerError = () => {
    return {
        type: REGISTER_ERROR,
    };
};

export const registerSuccess = (user) => {
    return {
        type: REGISTRATION_SUCCESSFUL,
        user,
    };
};

export const requestSendVerification = () => {
    return {
        type: VERIFICATION_REQUEST,
    };
};

export const verificationSent = (user) => {
    return {
        type: VERIFICATION_SUCCESSFULLY_SENT,
        user,
    };
};

export const registerUser = (email, password) => (dispatch) => {
    dispatch(requestRegister());
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(registerSuccess());
            dispatch(requestSendVerification());
            user.user
                .sendEmailVerification()
                .then(() => {
                    dispatch(verificationSent(user));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(registerError);
                });
        })
        .catch((error) => {
            console.log(error);
            dispatch(registerError());
        });
};
