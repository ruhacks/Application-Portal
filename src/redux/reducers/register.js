/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
