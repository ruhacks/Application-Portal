import {
    ADMIN_VERIFYING,
    ADMIN_VERIFIED,
    ADMIN_VERIFICATION_ERROR,
} from "../actions/adminActions";

export default (
    state = {
        verifyingAdmin: false,
        admin: false,
        adminErr: false,
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
        default:
            return state;
    }
};
