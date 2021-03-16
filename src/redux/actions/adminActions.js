import axios from "axios";

const { firestore, auth } = require("../../firebase");

export const ADMIN_VERIFYING = "VERIFYING_ADMIN";
export const ADMIN_VERIFIED = "VERIFIED_ADMIN";
export const ADMIN_VERIFICATION_ERROR = "ADMIN_VERIFICATION_ERROR";

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

export const verifyAdminWithDB = () => (dispatch) => {
    dispatch(adminVerifying());
    const user = auth.currentUser;

    if (!user) {
        return dispatch(adminVerificationError({ message: "No user found!" }));
    }
    const { uid } = user;

    firestore
        .doc(`admins/${uid}`)
        .get()
        .then((adminRef) => {
            if (adminRef.exists) {
                const { token, key } = adminRef.data();
                if (!token || !key)
                    return dispatch(
                        adminVerificationError({ message: "No user found!" })
                    );

                axios
                    .get(
                        `http://localhost:5001/ru-hacks-app-page/us-central1/admin/verify`,
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.data.admin && response.data.UID === uid) {
                            dispatch(adminVerified());
                        } else {
                            dispatch(
                                adminVerificationError({
                                    message: "Invalid response",
                                })
                            );
                        }
                    });
            } else {
                dispatch(adminVerificationError({ message: "No admin found" }));
            }
        });
};
