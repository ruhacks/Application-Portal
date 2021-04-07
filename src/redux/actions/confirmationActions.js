import { auth, firestore, storage } from "../../firebase";
import { updateAppRequest } from "./appActions";

import axios from "axios";

export const CONFIRMATION_REQUEST = "CONFIRMATION_REQUEST";
export const CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS";
export const CONFIRMATION_ERROR = "CONFIRMATION_ERROR";

export const UPDATE_ADDR_REQUEST = "UPDATE_ADDR_REQUEST";
export const UPDATE_ADDR_SUCCESS = "UPDATE_ADDR_SUCCESS";
export const UPDATE_ADDR_ERROR = "UPDATE_ADDR_ERROR";

export const DISCORD_URL_REQUEST = "DISCORD_URL_REQUEST";
export const DISCORD_URL_SUCCESS = "DISCORD_URL_SUCCESS";
export const DISCORD_URL_FAILURE = "DISCORD_URL_FAILURE";

export const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";

export const requestConfirmation = () => {
    return {
        type: CONFIRMATION_REQUEST,
    };
};

export const ConfirmationReceived = (confData) => {
    return {
        type: CONFIRMATION_SUCCESS,
        confData,
    };
};

export const ConfirmationError = (error) => {
    return {
        type: CONFIRMATION_ERROR,
        error,
    };
};

export const updateConfRequest = (appData) => {
    return {
        type: UPDATE_APP_REQUEST,
        appData,
    };
};

export const updateConfSuccess = () => {
    return {
        type: UPDATE_APP_SUCCESS,
    };
};

export const updateConfError = (error) => {
    return {
        type: UPDATE_APP_ERROR,
        error,
    };
};

export const discordURLRequest = () => {
    return {
        type: DISCORD_URL_REQUEST,
    };
};

export const discordURLSuccess = (url) => {
    return {
        type: DISCORD_URL_SUCCESS,
        url,
    };
};

export const discordURLFailure = (error) => {
    return {
        type: DISCORD_URL_FAILURE,
        error,
    };
};

export const updateAddrRequest = () => {
    return {
        type: UPDATE_ADDR_REQUEST,
    };
};

export const updateAddrSuccess = () => {
    return {
        type: UPDATE_ADDR_SUCCESS,
    };
};

export const updateAddrError = (error) => {
    return {
        type: UPDATE_ADDR_ERROR,
        err: error,
    };
};

export const uploadFileRequest = () => {
    return {
        type: UPLOAD_FILE_REQUEST,
    };
};

export const uploadFileSuccess = () => {
    return {
        type: UPLOAD_FILE_SUCCESS,
    };
};

export const uploadFileError = (error) => {
    return {
        type: UPLOAD_FILE_FAILURE,
        error,
    };
};

export const uploadFile = (file) => (dispatch) => {
    dispatch(uploadFileRequest());
    const user = auth.currentUser;
    const { uid } = user;
    const storageRef = storage.ref(`Resumes/${uid}/${file.name}`);
    const confRef = firestore.doc(`/confirmation/${uid}`);

    storageRef
        .put(file)
        .then((snapshot) => {
            dispatch(uploadFileSuccess());
            const fileName = snapshot.metadata.name;
            const timeCreated = new Date();
            snapshot.ref.getDownloadURL().then((URL) => {
                confRef.set(
                    { resume: { fileName, URL, timeCreated } },
                    { merge: true }
                );
            });
        })
        .catch((error) => {
            dispatch(uploadFileError(error));
        });
};

export const updateUsersAddress = (address) => (dispatch) => {
    dispatch(updateAddrRequest());
    const user = auth.currentUser;
    const { uid } = user;
    const confDoc = firestore.doc(`/confirmation/${uid}`);
    confDoc
        .set({ address: address }, { merge: true })
        .then(() => {
            return dispatch(updateAddrSuccess());
        })
        .catch((error) => {
            updateAddrError(error);
        });
};

export const getUsersConfirmation = () => (dispatch) => {
    dispatch(requestConfirmation());
    const user = auth.currentUser;
    if (!user) return dispatch(ConfirmationError({ error: "No user found!" }));

    if (user && user.uid) {
        const confDoc = firestore.doc(`confirmation/${user.uid}`);

        confDoc
            .get()
            .then((response) => {
                dispatch(ConfirmationReceived(response.data()));
            })
            .catch((error) => {
                dispatch(ConfirmationError(error));
            });
    }
};

export const getDiscordURL = () => (dispatch) => {
    dispatch(discordURLRequest());
    const user = auth.currentUser;
    if (!user) return dispatch(updateConfError({ error: "No user found!" }));
    let DISCORD_API_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/getURL`;
    if (process.env.NODE_ENV === "development") {
        //DISCORD_API_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/getURL/`;
    }
    if (user) {
        user.getIdToken().then((token) => {
            axios
                .request({
                    method: "GET",
                    url: DISCORD_API_URL,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.url) {
                        dispatch(discordURLSuccess(response.data.url));
                    }
                })
                .catch((error) => {
                    dispatch(discordURLFailure(error));
                });
        });
    }
};
