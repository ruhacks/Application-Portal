/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
} from '../actions/authActions';

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        isAuthenticated: false,
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
        default:
            return state;
    }
};
