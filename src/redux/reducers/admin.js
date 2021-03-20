import {
    ADMIN_VERIFYING,
    ADMIN_VERIFIED,
    ADMIN_VERIFICATION_ERROR,
    ADMIN_GET_COUNT,
    ADMIN_GOT_COUNT,
    ADMIN_GET_ERROR,
    ADMIN_GET_USERS,
    ADMIN_GOT_USERS,
    ADMIN_USERS_ERROR,
    ADMIN_SET_USER_REQUEST,
    ADMIN_SET_USER_SUCCESS,
    ADMIN_SET_USER_ERROR,
    ADMIN_SET_USERS_REQUEST,
    ADMIN_SET_USERS_SUCCESS,
} from "../actions/adminActions";

export default (
    state = {
        verifyingAdmin: false,
        gettingStatistics: false,
        gettingUsers: false,
        admin: false,
        adminErr: false,
        adminProfile: {},
        stats: {},
        getErr: {},
        userData: {},
        userErr: {},
        settingUser: false,
        updatedUID: "",
        updatedUIDs: [],
        typeOfUpdate: "",
        updateErr: {},
    },
    action
) => {
    switch (action.type) {
        case ADMIN_VERIFYING:
            return {
                ...state,
                verifyingAdmin: true,
            };

        case ADMIN_VERIFIED:
            return {
                ...state,
                verifyingAdmin: false,
                admin: true,
                adminProfile: action.admin,
            };
        case ADMIN_VERIFICATION_ERROR:
            return {
                ...state,
                verifyingAdmin: false,
                adminErr: action.err,
            };
        case ADMIN_GET_COUNT:
            return {
                ...state,
                gettingStatistics: true,
            };
        case ADMIN_GOT_COUNT:
            return {
                ...state,
                stats: action.data,
                gettingStatistics: false,
            };
        case ADMIN_GET_ERROR:
            return {
                ...state,
                err: action.err,
                gettingStatistics: false,
            };
        case ADMIN_GET_USERS:
            return {
                ...state,
                gettingUsers: true,
            };
        case ADMIN_GOT_USERS:
            return {
                ...state,
                gettingUsers: false,
                userData: action.data,
            };
        case ADMIN_USERS_ERROR:
            return {
                ...state,
                userErr: action.err,
            };
        case ADMIN_SET_USER_REQUEST:
            return {
                ...state,
                settingUser: true,
                updatedUID: "",
                typeOfUpdate: "",
                updatedUIDs: [],
            };
        case ADMIN_SET_USER_SUCCESS:
            return {
                ...state,
                settingUser: false,
                updatedUID: action.updatedUID,
                typeOfUpdate: action.typeOfUpdate,
            };
        case ADMIN_SET_USER_ERROR:
            return {
                ...state,
                settingUser: false,
                updateErr: action.error,
            };
        case ADMIN_SET_USERS_REQUEST:
            return {
                ...state,
                settingUser: true,
                updatedUIDs: [],
                updatedUID: "",
                typeOfUpdate: "",
            };
        case ADMIN_SET_USERS_SUCCESS:
            return {
                ...state,
                settingUser: false,
                updatedUIDs: action.updatedUIDs,
                typeOfUpdate: action.typeOfUpdate,
            };
        default:
            return state;
    }
};
