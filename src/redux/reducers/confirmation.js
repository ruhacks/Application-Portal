import {
    CONFIRMATION_REQUEST,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_ERROR,
    UPDATE_ADDR_REQUEST,
    UPDATE_ADDR_SUCCESS,
    UPDATE_ADDR_ERROR,
    DISCORD_URL_REQUEST,
    DISCORD_URL_SUCCESS,
    DISCORD_URL_FAILURE,
} from "../actions/confirmationActions";

export default (
    state = {
        isRequestingConfirmation: false,
        isRequestingDiscordURL: false,
        isUpdatingAddress: false,
        addressUpdated: false,
        addressError: {},
        discordData: {},
        url: "",
    },
    action
) => {
    switch (action.type) {
        case UPDATE_ADDR_REQUEST:
            return {
                ...state,
                isUpdatingAddress: true,
            };
        case UPDATE_ADDR_SUCCESS:
            return {
                ...state,
                isUpdatingAddress: false,
                addressUpdated: true,
            };
        case UPDATE_ADDR_ERROR:
            return {
                ...state,
                isUpdatingAddress: false,
                addressError: action.err,
            };
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

        case DISCORD_URL_REQUEST:
            return {
                ...state,
                isRequestingDiscordURL: true,
            };
        case DISCORD_URL_SUCCESS:
            return {
                ...state,
                isRequestingDiscordURL: false,
                url: action.url,
            };
        case DISCORD_URL_FAILURE:
            return {
                ...state,
                err: action.err,
            };
        default:
            return state;
    }
};
