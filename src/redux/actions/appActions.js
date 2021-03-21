import { auth, firestore } from "../../firebase";

export const APPLICATION_REQUEST = "APPLICATION_REQUEST";
export const APPLICATION_SUCCESS = "APPLICATION_SUCCESS";
export const APPLICATION_ERROR = "APPLICATION_ERROR";

export const UPDATE_APP_REQUEST = "UPDATE_APP_REQUEST";
export const UPDATE_APP_SUCCESS = "UPDATE_APP_SUCCESS";
export const UPDATE_APP_ERROR = "UPDATE_APP_ERROR";

export const APP_FIELDS_GET = "APP_FIELDS_GET";
export const APP_FIELDS_SUCCESS = "APP_FIELDS_SUCCESS";
export const APP_FIELDS_ERROR = "APP_FIELDS_ERROR";

export const DISABLE_APP_REDIRECT = "DISABLE_APP_REDIRECT";

export const requestApplication = () => {
    return {
        type: APPLICATION_REQUEST,
    };
};

export const applicationReceived = (appData) => {
    return {
        type: APPLICATION_SUCCESS,
        appData,
    };
};

export const applicationError = (error) => {
    return {
        type: APPLICATION_ERROR,
        error,
    };
};

export const updateAppRequest = (appData) => {
    return {
        type: UPDATE_APP_REQUEST,
        appData,
    };
};

export const updateAppSuccess = () => {
    return {
        type: UPDATE_APP_SUCCESS,
    };
};

export const updateAppError = (error) => {
    return {
        type: UPDATE_APP_ERROR,
        error,
    };
};

export const appFieldsGet = () => {
    return {
        type: APP_FIELDS_GET,
    };
};

export const appFieldsSuccess = (fields) => {
    return {
        type: APP_FIELDS_SUCCESS,
        fields,
    };
};

export const appFieldsError = (error) => {
    return {
        type: APP_FIELDS_ERROR,
        error,
    };
};

export const cancelAppRedirect = () => {
    return {
        type: DISABLE_APP_REDIRECT,
    };
};

export const getUsersApplication = () => (dispatch) => {
    dispatch(requestApplication());
    const user = auth.currentUser;

    if (!user) dispatch(applicationError({ message: "ERROR NO USER!" }));

    const { uid } = user;

    const userAppDoc = firestore.doc(`users/${uid}/application/fields`);
    userAppDoc
        .get()
        .then((response) => {
            dispatch(applicationReceived(response.data()));
        })
        .catch((error) => {
            dispatch(applicationError(error));
        });
};

export const setUsersApplication = (application) => (dispatch) => {
    const user = auth.currentUser;

    if (user.email) {
        application.email = user.email;
    }
    if (user && user.uid) {
        dispatch(updateAppRequest(application));
        firestore
            .doc(`users/${user.uid}/application/fields`)
            .set(application)
            .then(() => {
                dispatch(updateAppSuccess());
            })
            .catch((error) => {
                dispatch(updateAppError(error));
            });
    }
};

export const setAppRedirectToFalse = () => (dispatch) => {
    dispatch(cancelAppRedirect());
};
