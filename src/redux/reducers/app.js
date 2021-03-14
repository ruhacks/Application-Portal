import {
    APPLICATION_REQUEST,
    APPLICATION_SUCCESS,
    APPLICATION_ERROR,
    UPDATE_APP_REQUEST,
    UPDATE_APP_SUCCESS,
    UPDATE_APP_ERROR,
    APP_FIELDS_GET,
    APP_FIELDS_SUCCESS,
    APP_FIELDS_ERROR,
    DISABLE_APP_REDIRECT,
} from "../actions/appActions";

export default (
    state = {
        isRequestingApp: false,
        isRequestFields: false,
        isUpdatingFields: false,
        updatedFieldsSuccessfully: false,
        appError: "",
        app: {},
        fields: [],
    },
    action
) => {
    switch (action.type) {
        case APPLICATION_REQUEST:
            return {
                ...state,
                isRequestingApp: true,
                updatedFieldsSuccessfully: false,
                appError: "",
                app: {},
            };

        case APPLICATION_SUCCESS:
            return {
                ...state,
                app: action.appData,
                isRequestingApp: false,
                appError: "",
            };
        case APPLICATION_ERROR:
            return {
                ...state,
                app: {},
                isRequestingApp: false,
                appError: action.error,
            };
        case UPDATE_APP_REQUEST:
            return {
                ...state,
                isUpdatingFields: true,
            };
        case UPDATE_APP_SUCCESS:
            return {
                ...state,
                updatedFieldsSuccessfully: true,
                isUpdatingFields: false,
            };
        case UPDATE_APP_ERROR:
            return {
                ...state,
                appError: action.error,
                isUpdatingFields: false,
            };
        case APP_FIELDS_GET:
            return {
                ...state,
                isRequestFields: true,
                fields: [],
            };
        case APP_FIELDS_SUCCESS:
            return {
                ...state,
                isRequestFields: false,
                fields: action.fields,
            };
        case APP_FIELDS_ERROR:
            return {
                ...state,
                isRequestFields: false,
                fields: [],
                appError: action.error,
            };
        case DISABLE_APP_REDIRECT:
            return {
                ...state,
                updatedFieldsSuccessfully: false,
            };
        default:
            return state;
    }
};
