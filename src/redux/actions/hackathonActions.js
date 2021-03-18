import { firestore } from "../../firebase";

export const GET_HACAKTHON_DATE = "GET_HACAKTHON_DATE";
export const SET_HACAKTHON_DATE = "SET_HACAKTHON_DATE";
export const ERROR_HACKATHON_DATE = "ERROR_HACKATHON_DATE";

export const gettingHackDate = () => {
    return {
        type: GET_HACAKTHON_DATE,
    };
};

export const setHackDate = (date) => {
    return {
        type: SET_HACAKTHON_DATE,
        date,
    };
};

export const errorHackDate = (err) => {
    return {
        type: ERROR_HACKATHON_DATE,
        err,
    };
};

export const subscribeToHackathonTime = (setUnsubscribe) => (dispatch) => {
    dispatch(gettingHackDate());
    const settingsRef = firestore.doc("hackathon/info");
    const unsubscribe = settingsRef.onSnapshot((settings) => {
        if (settings.exists) {
            dispatch(setHackDate(settings.data()));
        } else {
            dispatch(errorHackDate({ MESSAGE: "NOT FOUND" }));
        }
    });
    setUnsubscribe(unsubscribe);
};
