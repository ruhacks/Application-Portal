import {
    CALENDAR_CREATE_EVENT_SUCCESS,
    CALENDAR_CREATE_EVENT_FAILURE,
    CALENDAR_CREATE_EVENT_REQUEST,
    CALENDAR_EDIT_EVENT_REQUEST,
    CALENDAR_EDIT_EVENT_SUCCESS,
    CALENDAR_EDIT_EVENT_FAILURE,
    CALENDAR_DELETE_EVENT_REQUEST,
    CALENDAR_DELETE_EVENT_SUCCESS,
    CALENDAR_DELETE_EVENT_FAILURE,
} from "../actions/calendarActions";

export default (
    state = {
        creatingEvent: false,
        createEventError: {},
        createdEventID: null,

        updatingEvent: false,
        updatedEventID: null,
        updateEventError: {},

        deletingEvent: false,
        deletingEventError: {},
    },
    action
) => {
    switch (action.type) {
        case CALENDAR_CREATE_EVENT_REQUEST:
            return {
                ...state,
                creatingEvent: true,
            };
        case CALENDAR_CREATE_EVENT_SUCCESS:
            return {
                ...state,
                creatingEvent: false,
                createdEventID: action.event_ID,
            };
        case CALENDAR_CREATE_EVENT_FAILURE:
            return {
                ...state,
                creatingEvent: false,
                createEventError: action.error,
            };
        case CALENDAR_EDIT_EVENT_REQUEST:
            return {
                ...state,
                updatingEvent: true,
            };
        case CALENDAR_EDIT_EVENT_SUCCESS:
            return {
                ...state,
                updatingEvent: false,
                updatedEventID: action.event_ID,
            };
        case CALENDAR_EDIT_EVENT_FAILURE:
            return {
                ...state,
                updatingEvent: false,
                updateEventError: action.error,
            };
        case CALENDAR_DELETE_EVENT_REQUEST:
            return {
                ...state,
                deletingEvent: true,
            };
        case CALENDAR_DELETE_EVENT_SUCCESS:
            return {
                ...state,
                deletingEvent: false,
            };
        case CALENDAR_DELETE_EVENT_FAILURE:
            return {
                ...state,
                deletingEvent: false,
                deletingEventError: action.error,
            };
        default:
            return {
                ...state,
            };
    }
};
