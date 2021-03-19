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
        default:
            return state;
    }
};
