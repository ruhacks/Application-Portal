import {
    APPLICATION_REQUEST,
    APPLICATION_SUCCESS,
    APPLICATION_ERROR,
    CREATE_APP_REQUEST,
    CREATE_APP_SUCCESS,
    CREATE_APP_ERROR,
    UPDATE_APP_REQUEST,
    UPDATE_APP_SUCCESS,
    UPDATE_APP_ERROR,
} from '../actions/appActions'

export default (
    state = {
        isRequestingApp: false,
        appError: false,
        app: {},
    },
    action
) => {
    switch(action.type) {
        case APPLICATION_REQUEST:
            return {
                ...state,
                isRequestingApp: true,
                appError: false,
                app: {},
            }
        
        case APPLICATION_SUCCESS:
            return{
                app: action.appData,
                isRequestingApp: false,
                appError: false,
            }
        case APPLICATION_ERROR:
            return{
                app: {},
                isRequestingApp: false,
                appError: action.error,
            }
        default:
            return state;
    }
}