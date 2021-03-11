import { auth, firestore } from "../../firebase";
import orderBy from "lodash/orderBy";
import toPairs from "lodash/toPairs";
import fromPairs from "lodash/fromPairs";

export const APPLICATION_REQUEST = "APPLICATION_REQUEST";
export const APPLICATION_SUCCESS = "APPLICATION_SUCCESS";
export const APPLICATION_ERROR = "APPLICATION_ERROR";

export const UPDATE_APP_REQUEST = "UPDATE_APP_REQUEST";
export const UPDATE_APP_SUCCESS = "UPDATE_APP_SUCCESS";
export const UPDATE_APP_ERROR = "UPDATE_APP_ERROR";

export const APP_FIELDS_GET = "APP_FIELDS_GET";
export const APP_FIELDS_SUCCESS = "APP_FIELDS_SUCCESS";
export const APP_FIELDS_ERROR = "APP_FIELDS_ERROR";

export const requestApplication = (uid) => {
    return {
        type: APPLICATION_REQUEST,
        uid,
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

export const getUsersApplication = (user) => (dispatch) => {
    dispatch(requestApplication(user.uid));
    const userAppDoc = firestore.doc(`applications/${user.uid}`);
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
    if (user && user.uid) {
        dispatch(updateAppRequest(application));
        firestore
            .doc(`applications/${user.uid}`)
            .set(application)
            .then(() => {
                dispatch(updateAppSuccess());
            })
            .catch((error) => {
                dispatch(updateAppError(error));
            });
    }
};

/* 
export const getApplicationFields = () => (dispatch) => {
    dispatch(appFieldsGet());
    firestore
        .doc("hackathon/fields")
        .get()
        .then((response) => {
            dispatch(appFieldsSuccess(sortFieldsOnOrder(response.data())));
        })
        .catch((error) => {
            dispatch(appFieldsError(error));
        });
};

const sortFieldsOnOrder = (fields) => {
    Object.keys(fields).forEach((field) => {
        const fieldData = fields[field];

        fieldData["keyRef"] = field;
        fields[field] = fieldData;
    });
    return orderBy(fields, ["order"], ["asc"]);
};
 */
