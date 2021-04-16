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
    TEAM_KICK_SUCCESS,
} from "../actions/teamActions";

export default (
    state = {
        creatingTeam: false,
        teamID: "",
        teamCreateError: {},
        joiningTeam: false,
        teamJoinError: {},
        gettingTeam: false,
        team: {},
        gettingTeamError: {},
        leavingTeam: false,
        leavingTeamError: {},
        deletingTeam: false,
        deletingTeamError: {},
        kickingMember: false,
        kickingMemberFailure: {},
    },
    action
) => {
    switch (action.type) {
        case TEAM_CREATE_REQUEST:
            return {
                ...state,
                creatingTeam: true,
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
                teamCreateError: action.error,
            };

        case TEAM_JOIN_REQUEST:
            return {
                ...state,
                joiningTeam: true,
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
                teamJoinError: action.error,
            };
        case GET_TEAM_REQUEST:
            return {
                ...state,
                gettingTeam: true,
            };
        case GET_TEAM_SUCCESS:
            return {
                ...state,
                gettingTeam: false,
                team: action.team,
                team_ID: action.team_ID,
            };
        case GET_TEAM_FAILURE:
            return {
                ...state,
                gettingTeam: false,
                gettingTeamError: action.error,
            };
        case TEAM_LEAVE_REQUEST:
            return {
                ...state,
                leavingTeam: true,
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
                leavingTeamError: action.error,
            };
        case DELETE_TEAM_REQUEST:
            return {
                ...state,
                deletingTeam: true,
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
                deletingTeamError: action.error,
            };
        case TEAM_KICK_REQUEST:
            return {
                ...state,
                kickingMember: true,
            };
        case TEAM_KICK_SUCCESS:
            return {
                ...state,
                kickingMember: false,
            };
        case TEAM_KICK_FAILURE:
            return {
                ...state,
                kickingMemberFailure: action.error,
            };
        default:
            return state;
    }
};
