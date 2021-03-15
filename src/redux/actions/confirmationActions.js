import { auth, firestore } from "../../firebase";
import { updateAppRequest } from "./appActions";

import DiscordOauth2 from "discord-oauth2";
import dotenv from "dotenv";

dotenv.config({ silent: true });

export const CONFIRMATION_REQUEST = "CONFIRMATION_REQUEST";
export const CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS";
export const CONFIRMATION_ERROR = "CONFIRMATION_ERROR";

export const UPDATE_CONF_REQUEST = "UPDATE_CONF_REQUEST";
export const UPDATE_CONF_SUCCESS = "UPDATE_CONF_SUCCESS";
export const UPDATE_CONF_ERROR = "UPDATE_CONF_ERROR";

export const DISCORD_ID_REQUEST = "DISCORD_ID_REQUEST";
export const DISCORD_ID_SUCCESS = "DISCORD_ID_SUCCESS";
export const DISCORD_ID_FAILURE = "DISCORD_ID_FAILURE";

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

export const discordIDRequest = () => {
    return {
        type: DISCORD_ID_REQUEST,
    };
};

export const discordIDSuccess = (uid) => {
    return {
        type: DISCORD_ID_SUCCESS,
        uid,
    };
};

export const discordIDFailure = (error) => {
    return {
        type: DISCORD_ID_FAILURE,
        error,
    };
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

export const setUsersConfirmation = (confirmation) => (dispatch) => {
    dispatch(updateAppRequest());
    const user = auth.currentUser;
    if (!user) return dispatch(updateConfError({ error: "No user found!" }));

    if (user && user.uid) {
        const confDoc = firestore.doc(`confirmations/${user.uid}`);

        confDoc
            .set(confirmation)
            .then(() => dispatch(updateConfSuccess()))
            .catch((error) => dispatch(updateConfError(error)));
    }
};
