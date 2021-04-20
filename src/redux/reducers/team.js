import {
    TEAM_CREATE_REQUEST,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_FAILURE,
    TEAM_JOIN_REQUEST,
    TEAM_JOIN_SUCCESS,
    TEAM_JOIN_FAILURE,
    GET_TEAM_REQUEST,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAILURE,
    TEAM_LEAVE_REQUEST,
    TEAM_LEAVE_SUCCESS,
    TEAM_LEAVE_FAILURE,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAILURE,
    TEAM_KICK_REQUEST,
    TEAM_KICK_SUCCESS,
    TEAM_KICK_FAILURE,
} from "../actions/teamActions";

export default (
    state = {
        creatingTeam: false,
        teamID: "",
        joiningTeam: false,
        gettingTeam: false,
        team: {},
        leavingTeam: false,
        deletingTeam: false,
        kickingMember: false,
        isOwner: false,
        teamError: {},
    },
    action
) => {
    switch (action.type) {
        case TEAM_CREATE_REQUEST:
            return {
                ...state,
                creatingTeam: true,
                teamError: {},
            };
        case TEAM_CREATE_SUCCESS:
            return {
                ...state,
                creatingTeam: false,
                teamID: action.team_ID,
            };
        case TEAM_CREATE_FAILURE:
            return {
                ...state,
                creatingTeam: false,
                teamError: action.error,
            };

        case TEAM_JOIN_REQUEST:
            return {
                ...state,
                joiningTeam: true,
                teamError: {},
            };
        case TEAM_JOIN_SUCCESS:
            return {
                ...state,
                joiningTeam: false,
                teamID: action.team_ID,
            };
        case TEAM_JOIN_FAILURE:
            return {
                ...state,
                joiningTeam: false,
                teamError: action.error,
            };
        case GET_TEAM_REQUEST:
            return {
                ...state,
                gettingTeam: true,
                teamError: {},
            };
        case GET_TEAM_SUCCESS:
            return {
                ...state,
                gettingTeam: false,
                team: action.team,
                teamID: action.team_ID,
                isOwner: action.owner,
            };
        case GET_TEAM_FAILURE:
            return {
                ...state,
                gettingTeam: false,
                teamError: action.error,
            };
        case TEAM_LEAVE_REQUEST:
            return {
                ...state,
                leavingTeam: true,
                teamError: {},
            };
        case TEAM_LEAVE_SUCCESS:
            return {
                ...state,
                leavingTeam: false,
                team_ID: "",
                team: {},
            };
        case TEAM_LEAVE_FAILURE:
            return {
                ...state,
                leavingTeam: false,
                teamError: action.error,
            };
        case DELETE_TEAM_REQUEST:
            return {
                ...state,
                deletingTeam: true,
                teamError: {},
            };
        case DELETE_TEAM_SUCCESS:
            return {
                ...state,
                deletingTeam: false,
                team_ID: "",
                team: {},
            };
        case DELETE_TEAM_FAILURE:
            return {
                ...state,
                deletingTeam: false,
                teamError: action.error,
            };
        case TEAM_KICK_REQUEST:
            return {
                ...state,
                kickingMember: true,
                teamError: {},
            };
        case TEAM_KICK_SUCCESS:
            return {
                ...state,
                kickingMember: false,
            };
        case TEAM_KICK_FAILURE:
            return {
                ...state,
                teamError: action.error,
            };
        default:
            return state;
    }
};
