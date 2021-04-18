const { firestore, auth } = require("../../firebase");

export const CALENDAR_CREATE_EVENT_SUCCESS = "CALENDAR_CREATE_EVENT_SUCCESS";
export const CALENDAR_CREATE_EVENT_FAILURE = "CALENDAR_CREATE_EVENT_FAILURE";
export const CALENDAR_CREATE_EVENT_REQUEST = "CALENDAR_CREATE_EVENT_REQUEST";

export const CALENDAR_EDIT_EVENT_REQUEST = "CALENDAR_EDIT_EVENT_REQUEST";
export const CALENDAR_EDIT_EVENT_SUCCESS = "CALENDAR_EDIT_EVENT_SUCCESS";
export const CALENDAR_EDIT_EVENT_FAILURE = "CALENDAR_EDIT_EVENT_FAILURE";

export const CALENDAR_DELETE_EVENT_REQUEST = "CALENDAR_DELETE_EVENT_REQUEST";
export const CALENDAR_DELETE_EVENT_SUCCESS = "CALENDAR_DELETE_EVENT_SUCCESS";
export const CALENDAR_DELETE_EVENT_FAILURE = "CALENDAR_DELETE_EVENT_FAILURE";

export const DAY_FRI = "DAY_FRI";
export const DAY_SUN = "DAY_SUN";
export const DAY_SAT = "DAY_SAT";

export const createEventReq = () => {
    return {
        type: CALENDAR_CREATE_EVENT_REQUEST,
    };
};

export const createEventSuccess = (event_ID) => {
    return {
        type: CALENDAR_CREATE_EVENT_SUCCESS,
        event_ID,
    };
};

export const createEventError = (error) => {
    return {
        type: CALENDAR_CREATE_EVENT_FAILURE,
        error,
    };
};

export const editEventReq = () => {
    return {
        type: CALENDAR_EDIT_EVENT_REQUEST,
    };
};

export const editEventSuccess = (event_ID) => {
    return {
        type: CALENDAR_EDIT_EVENT_SUCCESS,
        event_ID,
    };
};

export const editEventFailure = (error) => {
    return {
        type: CALENDAR_EDIT_EVENT_FAILURE,
        error,
    };
};

export const deleteEventReq = () => {
    return {
        type: CALENDAR_DELETE_EVENT_REQUEST,
    };
};

export const deleteEventSuccess = () => {
    return {
        type: CALENDAR_DELETE_EVENT_SUCCESS,
    };
};

export const deleteEventFailure = (error) => {
    return {
        type: CALENDAR_DELETE_EVENT_FAILURE,
        error,
    };
};

export const createEvent = (day, info) => async (dispatch) => {
    dispatch(createEventReq());

    const user = auth.currentUser;

    if (!user) {
        return dispatch(
            createEventError({
                message: "Error! No user found",
                eventCreated: false,
            })
        );
    }

    let databaseDay;

    switch (day) {
        case "DAY_FRI":
            databaseDay = "DAY_ONE";
            break;
        case "DAY_SAT":
            databaseDay = "DAY_TWO";
            break;
        case "DAY_SUN":
            databaseDay = "DAY_THREE";
            break;
        default:
            return dispatch(
                createEventError({
                    message: "Error! Invalid day provided",
                    eventEdited: false,
                })
            );
    }

    const calendarEventCollection = firestore.collection(
        `calendar/${databaseDay}/events`
    );
    let eventAddition;

    try {
        eventAddition = await calendarEventCollection.add(info);
        dispatch(createEventSuccess(eventAddition.id));
    } catch (error) {
        return dispatch(createEventError(error));
    }
};

export const editEvent = (day, info, event_ID) => async (dispatch) => {
    dispatch(editEventReq());

    let databaseDay;

    switch (day) {
        case "DAY_FRI":
            databaseDay = "DAY_ONE";
            break;
        case "DAY_SAT":
            databaseDay = "DAY_TWO";
            break;
        case "DAY_SUN":
            databaseDay = "DAY_THREE";
            break;
        default:
            return dispatch(
                editEventFailure({
                    message: "Error! Invalid day provided",
                    eventEdited: false,
                })
            );
    }

    const calendarEventRef = firestore.doc(
        `calendar/${databaseDay}/events/${event_ID}`
    );
    let eventAddition;
    try {
        eventAddition = await calendarEventRef.update(info);
        dispatch(editEventSuccess(eventAddition.id));
    } catch (error) {
        return dispatch(editEventFailure(error));
    }
};

export const deleteEvent = (day, event_ID) => async (dispatch) => {
    dispatch(deleteEventReq());

    const user = auth.currentUser;
    if (!user) {
        return dispatch(
            deleteEventFailure({
                message: "Error! No user found",
                eventCreated: false,
            })
        );
    }

    let databaseDay;

    switch (day) {
        case "DAY_FRI":
            databaseDay = "DAY_ONE";
            break;
        case "DAY_SAT":
            databaseDay = "DAY_TWO";
            break;
        case "DAY_SUN":
            databaseDay = "DAY_THREE";
            break;
        default:
            return dispatch(
                deleteEventFailure({ message: "Error! Invalid date provided" })
            );
    }

    const eventRef = firestore.doc(
        `calendar/${databaseDay}/events/${event_ID}`
    );

    try {
        await eventRef.delete();
        dispatch(deleteEventSuccess());
    } catch (error) {
        dispatch(deleteEventFailure(error));
    }
};
