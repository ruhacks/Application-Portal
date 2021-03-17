import axios from "axios";

const { firestore, auth } = require("../../firebase");

export const ADMIN_VERIFYING = "VERIFYING_ADMIN";
export const ADMIN_VERIFIED = "VERIFIED_ADMIN";
export const ADMIN_VERIFICATION_ERROR = "ADMIN_VERIFICATION_ERROR";

export const ADMIN_GET_COUNT = "ADMIN_GET_COUNT";
export const ADMIN_GOT_COUNT = "ADMIN_GOT_COUNT";

export const ADMIN_GET_ERROR = "ADMIN_GET_ERROR";

export const adminVerificationError = (err) => {
    return {
        type: ADMIN_VERIFICATION_ERROR,
        err,
    };
};

export const adminVerified = () => {
    return {
        type: ADMIN_VERIFIED,
    };
};

export const adminVerifying = () => {
    return {
        type: ADMIN_VERIFYING,
    };
};

export const gettingCountData = () => {
    return {
        type: ADMIN_GET_COUNT,
    };
};

export const gotCountData = (data) => {
    return {
        type: ADMIN_GOT_COUNT,
        data,
    };
};

export const getError = (err) => {
    return {
        type: ADMIN_GET_ERROR,
        err,
    };
};

export const verifyAdminWithDB = () => (dispatch) => {
    dispatch(adminVerifying());
    const user = auth.currentUser;

    if (!user.uid) {
        return dispatch(adminVerificationError({ message: "No user found!" }));
    }
    const { uid } = user;

    user.getIdToken().then((userToke) => {
        axios
            .get(
                `http://localhost:5001/ru-hacks-app-page/us-central1/admin/verify`,
                {
                    headers: {
                        Authorization: "Bearer " + userToke,
                    },
                }
            )
            .then((response) => {
                if (response.data.admin && response.data.uid === uid) {
                    dispatch(adminVerified());
                } else {
                    dispatch(
                        adminVerificationError({
                            message: "Invalid response",
                        })
                    );
                }
            });
    });
};

export const gatherCountStats = () => (dispatch) => {
    dispatch(gettingCountData());
    const usersStatsRef = firestore.doc(`users/--stats--`);
    const confStatsRef = firestore.doc(`confirmation/--stats--`);
    const appStatsRef = firestore.doc(`applications/--stats--`);

    //Oh look, A flock of Canadian geese!
    //Redo with async/await
    return usersStatsRef
        .get()
        .then((usersDoc) => {
            if (usersDoc.exists) {
                confStatsRef
                    .get()
                    .then((confDoc) => {
                        if (confDoc.exists) {
                            appStatsRef
                                .get()
                                .then((appDoc) => {
                                    if (appDoc.exists) {
                                        const allStats = {
                                            userStats: usersDoc.data(),
                                            confStats: confDoc.data(),
                                            appStats: appDoc.data(),
                                        };
                                        dispatch(gotCountData(allStats));
                                    } else {
                                        dispatch(
                                            getError({
                                                MESSAGE:
                                                    "APPLICATION STATISTICS ERROR",
                                            })
                                        );
                                    }
                                })
                                .catch((appErr) => {
                                    dispatch(
                                        getError({
                                            MESSAGE:
                                                "APPLICATION STATISTICS ERROR",
                                            appErr,
                                        })
                                    );
                                });
                        } else {
                            dispatch(
                                getError({
                                    MESSAGE: "CONFIRMATION STATISTICS ERROR",
                                })
                            );
                        }
                    })
                    .catch((confError) => {
                        dispatch(
                            getError({
                                MESSAGE: "CONFIRMATION STATISTICS ERROR",
                                confError,
                            })
                        );
                    });
            } else {
                dispatch(
                    getError({
                        MESSAGE: "USER STATISTICS ERROR",
                    })
                );
            }
        })
        .catch((usersErr) => {
            dispatch(
                getError({
                    MESSAGE: "USER STATISTICS ERROR",
                    usersErr,
                })
            );
        });
};
