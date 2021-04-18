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

export const CALENDAR_GET_ALL_REQUEST = "CALENDAR_GET_REQUEST";
export const CALENDAR_GET_ALL_SUCCESS = "CALENDAR_GET_SUCCESS";
export const CALENDAR_GET_ALL_FAILURE = "CALENDAR_GET_FAILURE";

export const CALENDAR_EVENT_GET_REQUEST = "CALENDAR_EVENT_GET_REQUEST";
export const CALENDAR_EVENT_GET_SUCCESS = "CALENDAR_EVENT_GET_SUCCESS";
export const CALENDAR_EVENT_GET_FAILURE = "CALENDAR_EVENT_GET_FAILURE";

export const CALENDAR_GET_DAY_REQUEST = "CALENDAR_GET_DAY_REQUEST";
export const CALENDAR_GET_DAY_SUCCESS = "CALENDAR_GET_DAY_SUCCESS";
export const CALENDAR_GET_DAY_FAILURE = "CALENDAR_GET_DAY_FAILURE";

export const DAY_FRI = "DAY_FRI";
export const DAY_SUN = "DAY_SUN";
export const DAY_SAT = "DAY_SAT";

export const getDayReq = () => {
    return {
        type: CALENDAR_GET_DAY_REQUEST,
    };
};

export const getDaySuccess = (dayEvents) => {
    return {
        type: CALENDAR_GET_DAY_SUCCESS,
        dayEvents,
    };
};

export const getDayError = (error) => {
    return {
        type: CALENDAR_GET_DAY_FAILURE,
        error,
    };
};

export const getEventReq = () => {
    return {
        type: CALENDAR_EVENT_GET_REQUEST,
    };
};

export const getEventSuccess = (event) => {
    return {
        type: CALENDAR_EVENT_GET_SUCCESS,
        event,
    };
};

export const getEventError = (error) => {
    return {
        tyoe: CALENDAR_EVENT_GET_FAILURE,
        error,
    };
};

export const getAllCalReq = () => {
    return {
        type: CALENDAR_GET_ALL_REQUEST,
    };
};

export const getAllCalSuccess = (calendar) => {
    return {
        type: CALENDAR_GET_ALL_SUCCESS,
        calendar,
    };
};

export const getAllCalFailure = (error) => {
    return {
        type: CALENDAR_GET_ALL_FAILURE,
        error,
    };
};

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

export const getOneEvent = (day, event_ID) => async (dispatch) => {
    dispatch(getEventReq());

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
                getEventError({
                    message: "Error! Invalid day provided",
                    eventEdited: false,
                })
            );
    }
    let EVENT_SNAP;

    const EVENT_REF = firestore.doc(
        `calendar/${databaseDay}/events/${event_ID}`
    );

    try {
        EVENT_SNAP = await EVENT_REF.get();
    } catch (error) {
        dispatch(getEventError(error));
    }

    if (EVENT_SNAP.exists) {
        dispatch(getEventSuccess(EVENT_SNAP.data()));
    } else {
        dispatch(getEventSuccess({}));
    }
};

export const getEventsForDay = (day) => async (dispatch) => {
    dispatch(getDayReq());

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

    const DAY_EVENTS_REF = firestore.collection(
        `calendar/${databaseDay}/events`
    );
    let DAY_EVENTS_SNAP;
    try {
        DAY_EVENTS_SNAP = await DAY_EVENTS_REF.get();
    } catch (error) {
        dispatch(getDayError(error));
    }

    const DAY_OBJ = {};

    if (!DAY_EVENTS_SNAP.empty) {
        DAY_EVENTS_SNAP.forEach((eventDoc) => {
            DAY_OBJ[eventDoc.id] = eventDoc.data();
        });
    }

    dispatch(getDaySuccess(DAY_OBJ));
};

export const getAllCalendarInfo = () => async (dispatch) => {
    dispatch(getAllCalReq());

    const calendar = {};

    const DAY_ONE_EVENTS = firestore.collection(`calendar/DAY_ONE/events`);
    const DAY_TWO_EVENTS = firestore.collection("calendar/DAY_TWO/events");
    const DAY_THREE_EVENTS = firestore.collection("calendar/DAY_THREE/events");

    let DAY_ONE_SNAPS;
    let DAY_TWO_SNAPS;
    let DAY_THREE_SNAPS;

    try {
        DAY_ONE_SNAPS = await DAY_ONE_EVENTS.get();
    } catch (error) {
        dispatch(getAllCalFailure(error));
    }

    try {
        DAY_TWO_SNAPS = await DAY_TWO_EVENTS.get();
    } catch (error) {
        dispatch(getAllCalFailure(error));
    }

    try {
        DAY_THREE_SNAPS = await DAY_THREE_EVENTS.get();
    } catch (error) {
        dispatch(getAllCalFailure(error));
    }

    const DAY_FRI = {};
    const DAY_SAT = {};
    const DAY_SUN = {};

    if (!DAY_ONE_SNAPS.empty) {
        DAY_ONE_SNAPS.forEach((eventDoc) => {
            DAY_FRI[eventDoc.id] = eventDoc.data();
        });
    }

    if (!DAY_TWO_SNAPS.empty) {
        DAY_TWO_SNAPS.forEach((eventDoc) => {
            DAY_SAT[eventDoc.id] = eventDoc.data();
        });
    }

    if (!DAY_THREE_SNAPS.empty) {
        DAY_THREE_SNAPS.forEach((eventDoc) => {
            DAY_SUN[eventDoc.id] = eventDoc.data();
        });
    }

    calendar["DAY_FRI"] = DAY_FRI;
    calendar["DAY_SAT"] = DAY_SAT;
    calendar["DAY_SUN"] = DAY_SUN;

    dispatch(getAllCalSuccess(calendar));
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
