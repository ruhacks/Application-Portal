/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/*                                  register.js
Description:    Initializes state variables regarding registration. Then whenever an action is dispatched like REGISTER_REQUEST it adjusts the state variables accordingly.
                This reducer function will be called everytime an action is dispatched from ../actions/registerActions.js
                Notable things that happen here:
                    -   Take action type (like REGISTER_REQUEST) and adjust the redux store state variables that are being used by various components

                     
*/
import {
    REGISTER_REQUEST,
    REGISTRATION_SUCCESSFUL,
    REGISTER_ERROR,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESSFULLY_SENT,
} from '../actions/registerActions';

export default (
    state = {
        isRegistering: false,
        registerError: false,
        registrationComplete: false,
        verificationError: false,
        verificationSent: false,
        verificationRequested: false,
        registrationProcessComplete: false,
        user: {},
    },
    action,
) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true,
            };
        case REGISTRATION_SUCCESSFUL:
            return {
                ...state,
                isRegistering: false,
                registrationComplete: true,
                registerError: false,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                registerError: true,
                isRegistering: false,
                verificationRequest: false,
            };
        case VERIFICATION_REQUEST:
            return {
                ...state,
                verificationRequest: true,
            };
        case VERIFICATION_SUCCESSFULLY_SENT:
            return {
                ...state,
                verificationRequest: false,
                verificationSent: true,
                registrationProcessComplete: true,
                registrationComplete: false,
            };
        default:
            return state;
    }
};

/* 
From here you can go to:
    -   registerActions in src/redux/actions/registerActions.js to see what the registerUser function does when dispatched with a user email and password and where these actions comes from if you haven't seen it
*/
