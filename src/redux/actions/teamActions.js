import axios from "axios";
import { auth, firestore } from "../../firebase";

export const TEAM_CREATE_REQUEST = "TEAM_CREATE_REQUEST";
export const TEAM_CREATE_SUCCESS = "TEAM_CREATE_SUCCESS";
export const TEAM_CREATE_FAILURE = "TEAM_CREATE_FAILURE";

export const TEAM_JOIN_REQUEST = "TEAM_JOIN_REQUEST";
export const TEAM_JOIN_SUCCESS = "TEAM_JOIN_SUCCESS";
export const TEAM_JOIN_FAILURE = "TEAM_JOIN_FAULURE";

export const GET_TEAM_REQUEST = "GET_TEAM_REQUEST";
export const GET_TEAM_SUCCESS = "GET_TEAM_SUCCESS";
export const GET_TEAM_FAILURE = "GET_TEAM_FAILURE";

export const DELETE_TEAM_REQUEST = "DELETE_TEAM_REQUEST";
export const DELETE_TEAM_SUCCESS = "DELETE_TEAM_SUCCESS";
export const DELETE_TEAM_FAILURE = "DELETE_TEAM_FAILURE";

export const TEAM_LEAVE_REQUEST = "TEAM_LEAVE_REQUEST";
export const TEAM_LEAVE_SUCCESS = "TEAM_LEAVE_SUCCESS";
export const TEAM_LEAVE_FAILURE = "TEAM_LEAVE_FAILURE";

export const TEAM_KICK_REQUEST = "TEAM_KICK_REQUEST";
export const TEAM_KICK_SUCCESS = "TEAM_KICK_SUCCESS";
export const TEAM_KICK_FAILURE = "TEAM_KICK_FAILURE";

export const teamKickRequest = () => {
    return {
        type: TEAM_KICK_REQUEST,
    };
};

export const teamKickSuccess = () => {
    return {
        type: TEAM_KICK_SUCCESS,
    };
};

export const teamKickFailure = (error) => {
    return {
        type: TEAM_LEAVE_FAILURE,
        error,
    };
};

export const teamLeaveRequest = () => {
    return {
        type: TEAM_LEAVE_REQUEST,
    };
};

export const teamLeaveSuccess = () => {
    return {
        type: TEAM_LEAVE_SUCCESS,
    };
};

export const teamLeaveFailure = (error) => {
    return {
        type: TEAM_LEAVE_FAILURE,
        error,
    };
};

export const deleteTeamRequest = () => {
    return {
        type: DELETE_TEAM_REQUEST,
    };
};

export const deleteTeamSuccess = () => {
    return {
        type: DELETE_TEAM_SUCCESS,
    };
};

export const deleteTeamFailure = (error) => {
    return {
        type: DELETE_TEAM_FAILURE,
        error,
    };
};

export const createTeamRequest = () => {
    return {
        type: TEAM_CREATE_REQUEST,
    };
};

export const createTeamSuccess = (team_ID) => {
    return {
        type: TEAM_CREATE_SUCCESS,
        team_ID,
    };
};

export const createTeamFailure = (error) => {
    return {
        type: TEAM_CREATE_FAILURE,
        error,
    };
};

export const joinTeamRequest = () => {
    return {
        type: TEAM_JOIN_REQUEST,
    };
};

export const joinTeamSuccess = (team_ID) => {
    return {
        type: TEAM_JOIN_SUCCESS,
        team_ID,
    };
};

export const joinTeamError = (error) => {
    return {
        type: TEAM_JOIN_FAILURE,
        error,
    };
};

export const getTeamRequest = () => {
    return {
        type: GET_TEAM_REQUEST,
    };
};

export const getTeamSuccess = (team_ID, team, owner) => {
    return {
        type: GET_TEAM_SUCCESS,
        team_ID,
        team,
        owner,
    };
};

export const getTeamError = (error) => {
    return {
        type: GET_TEAM_FAILURE,
        error,
    };
};

export const kickUsers = (uidsToKick, team_ID) => (dispatch) => {
    uidsToKick.forEach((uid) => {
        dispatch(teamKickRequest());
    });

    const user = auth.currentUser;

    if (!user) {
        return dispatch(
            teamKickFailure({ user: false, message: "NO USER FOUND!" })
        );
    }

    if (uidsToKick.length === 0) {
        return dispatch(
            teamKickFailure({
                userToKick: false,
                message: "Error no user found",
            })
        );
    }

    uidsToKick.forEach((uid) => {
        kickUser(user, uid, team_ID, dispatch);
    });
};

function kickUser(user, uidToKick, team_ID, dispatch) {
    let TEAM_API_KICK_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/team/kick`;
    if (process.env.NODE_ENV === "development") {
        TEAM_API_KICK_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/team/kick`;
    }
    user.getIdToken().then((token) => {
        axios
            .post(
                TEAM_API_KICK_URL,
                { ID: team_ID, kickID: uidToKick },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((response) => {
                if (
                    response &&
                    response.data &&
                    response.data.userKicked &&
                    response.data.userUpdated
                ) {
                    return dispatch(teamKickSuccess());
                } else {
                    return dispatch(
                        teamKickFailure({
                            message: "There was an error kicking the user",
                            response,
                        })
                    );
                }
            })
            .catch((error) => {
                return dispatch(teamKickFailure(error));
            });
    });
}

export const leaveTeam = (team_ID) => (dispatch) => {
    dispatch(teamLeaveRequest());
    const user = auth.currentUser;

    let TEAM_API_LEAVE_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/team/leave/${team_ID}`;
    if (process.env.NODE_ENV === "development") {
        TEAM_API_LEAVE_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/team/leave/${team_ID}`;
    }

    if (!user) {
        return dispatch(
            teamLeaveFailure({ user: false, message: "NO USER FOUND!" })
        );
    }
    user.getIdToken().then((token) => {
        axios
            .request({
                method: "GET",
                url: TEAM_API_LEAVE_URL,
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                if (response.data.teamLeft && response.data.userUpdated) {
                    dispatch(teamLeaveSuccess());
                } else {
                    dispatch(teamLeaveFailure(response.data));
                }
            })
            .catch((error) => {
                if (error.isAxiosError) {
                    dispatch(teamLeaveFailure(error.response.data));
                }
            });
    });
};

export const deleteTeam = (team_ID) => (dispatch) => {
    dispatch(deleteTeamRequest());
    const user = auth.currentUser;

    let TEAM_API_DELETE_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/team/delete/${team_ID}`;
    if (process.env.NODE_ENV === "development") {
        TEAM_API_DELETE_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/team/delete/${team_ID}`;
    }

    if (!user) {
        return dispatch(
            deleteTeamFailure({ user: false, message: "NO USER FOUND!" })
        );
    }

    if (user) {
        user.getIdToken().then((token) => {
            axios
                .request({
                    method: "GET",
                    url: TEAM_API_DELETE_URL,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.teamDeleted) {
                        dispatch(deleteTeamSuccess());
                    } else {
                        dispatch(deleteTeamFailure(response.data));
                    }
                })
                .catch((error) => {
                    if (error.isAxiosError) {
                        dispatch(deleteTeamFailure(error.response.data));
                    }
                });
        });
    }
};

export const createTeam = (name) => (dispatch) => {
    dispatch(createTeamRequest());

    const user = auth.currentUser;
    let TEAM_API_CREATE_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/team/create`;
    if (process.env.NODE_ENV === "development") {
        TEAM_API_CREATE_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/team/create`;
    }

    if (!user) {
        return dispatch(
            createTeamError({ user: false, message: "NO USER FOUND!" })
        );
    }
    if (user) {
        user.getIdToken().then((token) => {
            axios
                .request({
                    method: "POST",
                    url: TEAM_API_CREATE_URL,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    data: {
                        team_name: name,
                    },
                })
                .then((response) => {
                    if (response.data.team_ID) {
                        dispatch(createTeamSuccess(response.data.team_ID));
                    } else {
                        dispatch(createTeamFailure(response.data));
                    }
                })
                .catch((error) => {
                    if (error.isAxiosError) {
                        dispatch(createTeamFailure(error.response.data));
                    }
                });
        });
    }
};

export const joinTeam = (joinID) => (dispatch) => {
    dispatch(joinTeamRequest());

    const user = auth.currentUser;
    let TEAM_API_JOIN_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/team/join/${joinID}`;
    if (process.env.NODE_ENV === "development") {
        TEAM_API_JOIN_URL = `http://localhost:5001/ru-hacks-app-page/us-central1/team/join/${joinID}`;
    }

    if (!user) {
        return dispatch(
            joinTeamError({ user: false, message: "NO USER FOUND!" })
        );
    }
    if (user) {
        user.getIdToken().then((token) => {
            axios
                .request({
                    method: "GET",
                    url: TEAM_API_JOIN_URL,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.teamJoined && response.data.userUpdated) {
                        dispatch(joinTeamSuccess(joinID));
                    } else {
                        dispatch(
                            joinTeamError({
                                message: "Error with joining team",
                            })
                        );
                    }
                })
                .catch((error) => {
                    if (error.isAxiosError) {
                        dispatch(joinTeamError(error.response.data));
                    }
                });
        });
    }
};

export const getTeam = (team_ID, setUnsubscribe) => (dispatch) => {
    dispatch(getTeamRequest());

    const user = auth.currentUser;

    if (!user) {
        return dispatch(getTeamError({ message: "Error, no user found" }));
    }

    const teamRef = firestore.doc(`teams/${team_ID}`);

    const unsubscribe = teamRef.onSnapshot((teamSnap) => {
        if (teamSnap.exists) {
            const team = teamSnap.data();
            let owner = false;
            if (team && team[user.uid] && team[user.uid].owner) owner = true;
            dispatch(getTeamSuccess(team_ID, team, owner));
        } else {
            dispatch(getTeamError({ message: "Error no team found" }));
        }
    });

    setUnsubscribe(unsubscribe);

    /*
    try {
        teamSnap = await teamRef.get();
    } catch (error) {
        return dispatch(getTeamError({ message: "Error getting team", error }));
    }

    if (teamSnap.exists && teamSnap.data()) {
        const team = teamSnap.data();
        let owner = false;
        if (team && team[user.uid] && team[user.uid].owner) owner = true;
        dispatch(getTeamSuccess(team_ID, teamSnap.data(), owner));
    } else {
        dispatch(getTeamError({ message: "Error no team found " }));
    }*/
};
