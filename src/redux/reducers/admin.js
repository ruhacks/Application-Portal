import {
    ADMIN_VERIFYING,
    ADMIN_VERIFIED,
    ADMIN_VERIFICATION_ERROR,
    ADMIN_GET_COUNT,
    ADMIN_GOT_COUNT,
    ADMIN_GET_ERROR,
} from "../actions/adminActions";

export default (
    state = {
        verifyingAdmin: false,
        gettingStatistics: false,
        admin: false,
        adminErr: false,
        stats: {},
        getErr: {},
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
        default:
            return state;
    }
};
