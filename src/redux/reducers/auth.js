/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/*                                  auth.js
Description:    Initializes state variables regarding authentication. Then whenever an action is dispatched like LOGIN_REQUEST it adjusts the state variables accordingly.
                This reducer function will be called everytime an action is dispatched from ../actions/authActions
                Notable things that happen here:
                    -   Take action type (like LOGIN_REQUEST) and adjust the redux store state variables that are being used by various components

                     
*/
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFICATION_LINK_SENT,
    VERIFICATION_LINK_REQUEST,
    VERIFICATION_LINK_ERROR,
} from '../actions/authActions';

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        isAuthenticated: false,
        verificationLinkRequest: false,
        verificationLinkSent: false,
        verificationLinkError: false,
        user: {},
    },
    action,
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
            };
            break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
            };
            break;
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
            };
            break;
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false,
            };
            break;
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
            };
            break;
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingout: false,
                logoutError: true,
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
            };
            break;
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
            };
        case VERIFICATION_LINK_REQUEST:
            return {
                ...state,
                verificationLinkRequest: true,
                verificationLinkSent: false,
            };
        case VERIFICATION_LINK_SENT:
            return {
                ...state,
                verificationLinkRequest: false,
                verificationLinkSent: true,
            };
        case VERIFICATION_LINK_ERROR:
            return {
                ...state,
                verificationLinkError: true,
                verificationLinkRequest: false,
                verificationLinkSent: false,
            };
        default:
            return state;
    }
};

/* 
From here you can go to:
    -   authActions in src/redux/actions/authActions to see what the loginUser function does when dispatched with a user email and password and where these actions comes from if you haven't seen it
*/
