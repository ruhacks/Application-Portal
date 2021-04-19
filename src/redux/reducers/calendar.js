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
    CALENDAR_GET_ALL_REQUEST,
    CALENDAR_GET_ALL_SUCCESS,
    CALENDAR_GET_ALL_FAILURE,
    CALENDAR_EVENT_GET_REQUEST,
    CALENDAR_EVENT_GET_SUCCESS,
    CALENDAR_EVENT_GET_FAILURE,
    CALENDAR_GET_DAY_REQUEST,
    CALENDAR_GET_DAY_SUCCESS,
    CALENDAR_GET_DAY_FAILURE,
} from "../actions/calendarActions";

export default (
    state = {
        getSpecificEvent: false,
        specificEvent: {},
        getSpecificEventError: {},

        getDayEvents: false,
        dayEvents: {},
        gettingDayEventsError: {},

        gettingFullCalendar: false,
        calendar: {},
        getinngFullCalendarError: {},
        calendarLoaded: false,

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
        case CALENDAR_EVENT_GET_REQUEST:
            return {
                ...state,
                getSpecificEvent: true,
            };
        case CALENDAR_EVENT_GET_SUCCESS:
            return {
                ...state,
                getSpecificEvent: false,
                specificEvent: action.event,
            };
        case CALENDAR_EVENT_GET_FAILURE:
            return {
                ...state,
                getSpecificEvent: false,
                getSpecificEvent: action.error,
            };
        case CALENDAR_GET_DAY_REQUEST:
            return {
                ...state,
                getDayEvents: true,
            };
        case CALENDAR_GET_DAY_SUCCESS:
            return {
                ...state,
                getDayEvents: false,
                dayEvents: action.dayEvents,
            };
        case CALENDAR_GET_DAY_FAILURE:
            return {
                ...state,
                getDayEvents: false,
                gettingDayEventsError: action.error,
            };
        case CALENDAR_GET_ALL_REQUEST:
            return {
                ...state,
                gettingFullCalendar: true,
            };
        case CALENDAR_GET_ALL_SUCCESS:
            return {
                ...state,
                gettingFullCalendar: false,
                calendar: action.calendar,
                calendarLoaded: true,
            };
        case CALENDAR_GET_ALL_FAILURE:
            return {
                ...state,
                gettingFullCalendar: false,
                gettingFullCalendarError: action.error,
            };
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
