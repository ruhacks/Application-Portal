const { firestore, auth } = require("../../firebase");

export const CALENDAR_EVENT_SUCESS = "CALENDAR_CREATE_EVENT_SUCESS";
export const CALENDAR_EVENT_FAILURE = "CALENDAR_CREATE_EVENT_FAILURE";

export const DAY_FRI = "DAY_FRI";
export const DAY_SUN = "DAY_SUN";
export const DAY_SAT = "DAY_SAT";
export const createEvent = (day, info) => {
    switch (day) {
        case DAY_FRI:
            return;
        case DAY_SAT:
            return;
        case DAY_SUN:
            return;
    }
};
