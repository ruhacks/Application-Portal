import axios from "axios";

const { firestore, auth } = require("../../firebase");

export const ADMIN_VERIFYING = "ADMIN_VERIFYING";
export const ADMIN_VERIFIED = "ADMIN_VERIFIED";
export const ADMIN_VERIFICATION_ERROR = "ADMIN_VERIFICATION_ERROR";

export const ADMIN_GET_COUNT = "ADMIN_GET_COUNT";
export const ADMIN_GOT_COUNT = "ADMIN_GOT_COUNT";

export const ADMIN_GET_USERS = "ADMIN_GET_USERS";
export const ADMIN_GOT_USERS = "ADMIN_GOT_USERS";

export const ADMIN_GET_ERROR = "ADMIN_GET_ERROR";
export const ADMIN_USERS_ERROR = "ADMIN_USERS_ERROR";

export const adminVerificationError = (err) => {
    return {
        type: ADMIN_VERIFICATION_ERROR,
        err,
    };
};

export const adminVerified = (admin) => {
    return {
        type: ADMIN_VERIFIED,
        admin,
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

export const gettingUsers = () => {
    return {
        type: ADMIN_GET_USERS,
    };
};

export const gotUsers = (data) => {
    return {
        type: ADMIN_GOT_USERS,
        data,
    };
};

export const userError = (err) => {
    return {
        type: ADMIN_USERS_ERROR,
        err,
    };
};

export const verifyAdminWithDB = () => (dispatch) => {
    dispatch(adminVerifying());
    const user = auth.currentUser;
    if (!user) {
        return dispatch(adminVerificationError({ message: "No user found!" }));
    }
    const { uid } = user;

    const adminRef = firestore.doc(`admins/${uid}`);
    adminRef
        .get()
        .then((adminDoc) => {
            if (adminDoc.exists) {
                dispatch(adminVerified(Object.assign({}, adminDoc.data())));
            } else {
                dispatch(adminVerificationError({ message: "No admin found" }));
            }
        })
        .catch((err) => {
            dispatch(
                adminVerificationError({ message: "Unknown Error!", err })
            );
        });
};

export const gatherUsers = (sortBy, order, lastUserSnapshot) => async (
    dispatch
) => {
    dispatch(gettingUsers());
    const profileColl = firestore.collection("users");
    const getAppRef = (uid) => firestore.doc(`users/${uid}/application/fields`);
    const getStatusRef = (uid) => firestore.doc(`users/${uid}/status/fields`);

    if (!sortBy) sortBy = "email";
    if (!order) order = "desc";

    try {
        const profiles = await profileColl
            .orderBy(sortBy, order)
            .limit(25)
            .get();

        const profileData = {
            users: {},
            last: profiles.docs[profiles.docs.length - 1],
            first: profiles.docs[0],
        };

        profiles.forEach((profile) => {
            console.log(profile.metadata);
            profileData.users[profile.id] = profile.data();
        });

        const gettingData = Object.keys(profileData.users).map(
            async (key, idx) => {
                const appRef = getAppRef(key);
                const statusRef = getStatusRef(key);

                const app = await appRef.get();
                const status = await statusRef.get();

                if (app.exists) {
                    profileData.users[key].application = app.data();
                }
                if (status.exists) {
                    profileData.users[key].status = status.data();
                }

                return { app, status };
            }
        );
        await Promise.all(gettingData);
        return dispatch(gotUsers(profileData));
    } catch (error) {
        dispatch(userError(error));
    }
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
