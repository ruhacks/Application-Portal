import { auth, firestore } from "../../firebase";
import { updateAppRequest } from "./appActions";

import DiscordOauth2 from "discord-oauth2";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ silent: true });

export const CONFIRMATION_REQUEST = "CONFIRMATION_REQUEST";
export const CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS";
export const CONFIRMATION_ERROR = "CONFIRMATION_ERROR";

export const UPDATE_CONF_REQUEST = "UPDATE_CONF_REQUEST";
export const UPDATE_CONF_SUCCESS = "UPDATE_CONF_SUCCESS";
export const UPDATE_CONF_ERROR = "UPDATE_CONF_ERROR";

export const DISCORD_URL_REQUEST = "DISCORD_URL_REQUEST";
export const DISCORD_URL_SUCCESS = "DISCORD_URL_SUCCESS";
export const DISCORD_URL_FAILURE = "DISCORD_URL_FAILURE";

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
    //const DISCORD_API_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/getURL`;
    const DISCORD_API_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/getURL/`;

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
