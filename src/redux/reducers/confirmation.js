import {
    CONFIRMATION_REQUEST,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_ERROR,
    UPDATE_CONF_REQUEST,
    UPDATE_CONF_SUCCESS,
    UPDATE_CONF_ERROR,
    DISCORD_ID_REQUEST,
    DISCORD_ID_SUCCESS,
    DISCORD_ID_FAILURE,
} from "../actions/confirmationActions";

export default (
    state = {
        isRequestingConfirmation: false,
        discordData: {},
    },
    action
) => {
    switch (action.type) {
        case CONFIRMATION_REQUEST:
            return {
                ...state,
                isRequestingConfirmation: true,
            };

        case CONFIRMATION_SUCCESS:
            return {
                ...state,
                isRequestingConfirmation: false,
                conf: action.confData,
            };
        case CONFIRMATION_ERROR:
            return {
                ...state,
                isRequestingConfirmation: false,
                error: action.error,
            };
        default:
            return state;
    }
};
