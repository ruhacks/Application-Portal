const {  firestore } = require("../../firebase");

export const APPLICATION_REQUEST = 'APPLICATION_REQUEST';
export const APPLICATION_SUCCESS = 'APPLICATION_SUCCESS';
export const APPLICATION_ERROR = 'APPLICATION_ERROR';

export const CREATE_APP_REQUEST = 'CREATE_APP_REQUEST';
export const CREATE_APP_SUCCESS = 'CREATE_APP_SUCCESS';
export const CREATE_APP_ERROR = 'CREATE_APP_ERROR';

export const UPDATE_APP_REQUEST = 'UPDATE_APP_REQUEST';
export const UPDATE_APP_SUCCESS = 'UPDATE_APP_SUCCESS';
export const UPDATE_APP_ERROR = 'UPDATE_APP_ERROR';

export const requestApplication = (uid) => {
    return {
        type: APPLICATION_REQUEST,
        uid,
    };
}

export const applicationReceived = (appData) => {
    return {
        type: APPLICATION_SUCCESS,
        appData,
    }
}

export const applicationError = (error) => {
    return {
        type: APPLICATION_ERROR,
        error,
    }
}

export const updateAppRequest = (appData) => {
    return{
        type: UPDATE_APP_REQUEST,
        appData,
    }
}

export const updateAppSuccess = () => {
    return {
        type: UPDATE_APP_SUCCESS,
    }
}

export const updateAppError = () => {
    return {
        type: UPDATE_APP_ERROR,
    }
}

export const getUsersApplication = (user) => (dispatch) => {
    dispatch(requestApplication(user.uid));
    firestore.doc(`applications/${user.uid}`).get()
    .then(response => {
        dispatch(applicationReceived(response.data()))
    })
    .catch(error => {
        dispatch(applicationError(error))
    })
}