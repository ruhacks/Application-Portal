import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import {
    createTeam,
    deleteTeam,
    getTeam,
    joinTeam,
    kickUsers,
    leaveTeam,
    subscribeToUserProfile,
} from "../../../redux/actions";

import "../../../css/_team.scss";
import text from "../../config/text";

import isEmpty from "lodash/isEmpty";
import { DataGrid } from "@material-ui/data-grid";

class Team extends React.Component {
    static propTypes = {
        gettingTeam: PropTypes.bool,
        creatingTeam: PropTypes.bool,
        joiningTeam: PropTypes.bool,
        isOwner: PropTypes.bool,

        userInfo: PropTypes.object,
        team: PropTypes.object,
        user: PropTypes.object,

        getTeam: PropTypes.func,
        createTeam: PropTypes.func,
        joinTeam: PropTypes.func,
        kickUsers: PropTypes.func,
        deleteTeam: PropTypes.func,
        leaveTeam: PropTypes.func,

        teamID: PropTypes.string,
    };
    constructor(props) {
        super(props);

        this.state = {
            joinID: "",
            team_name: "",
            inTeam: false,
            selectedUsers: [],
            selecetedUsersID: [],
            errorText: "",
            unsubscribeFromTeam: null,
            confDelete: false,
            confKick: false,
        };

        this.setUnsubscribe = this.setUnsubscribe.bind(this);

        this.handleSelectingCheckbox = this.handleSelectingCheckbox.bind(this);
        this.handleSelectionModelChange = this.handleSelectionModelChange.bind(
            this
        );

        this.handleJoinIDChange = this.handleJoinIDChange.bind(this);
        this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
        this.handleJoinTeam = this.handleJoinTeam.bind(this);
        this.handleLeaveTeam = this.handleLeaveTeam.bind(this);
        this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
        this.handleKickUsers = this.handleKickUsers.bind(this);

        this.handleDialogDeleteTeam = this.handleDialogDeleteTeam.bind(this);
        this.handleDialogDeleteUsers = this.handleDialogDeleteUsers.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    componentDidMount() {
        if (this.props.userInfo) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(
                    this.props.userInfo.team_ID,
                    this.setUnsubscribe
                );
                this.setState({
                    inTeam: true,
                });
            }
        }
    }

    componentWillUnmount() {
        if (
            this.state.unsubscribeFromTeam &&
            this.state.unsubscribeFromTeam !== null
        ) {
            this.state.unsubscribeFromTeam();
        }
    }

    setUnsubscribe(unsubVar) {
        this.setState({
            unsubscribeFromProfile: unsubVar,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.creatingTeam && !this.props.creatingTeam) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(
                    this.props.userInfo.team_ID,
                    this.setUnsubscribe
                );
                this.setState({
                    inTeam: true,
                });
            } else if (this.props.teamID) {
                this.props.getTeam(this.props.teamID, this.setUnsubscribe);
                this.setState({
                    inTeam: true,
                });
            }
        }
        if (isEmpty(prevProps.userInfo) && !isEmpty(this.props.userInfo)) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(
                    this.props.userInfo.team_ID,
                    this.setUnsubscribe
                );
                this.setState({
                    inTeam: true,
                });
            } else if (this.props.teamID) {
                this.props.getTeam(this.props.teamID, this.setUnsubscribe);
                this.setState({
                    inTeam: true,
                });
            }
        }
        if (!prevProps.teamID && this.props.teamID) {
            this.props.getTeam(this.props.teamID, this.setUnsubscribe);
            this.setState({
                inTeam: true,
            });
        }
    }

    handleJoinIDChange({ target }) {
        this.setState({
            joinID: target.value,
        });
    }

    handleTeamNameChange({ target }) {
        this.setState({
            team_name: target.value,
        });
    }

    handleCreateTeam() {
        const { team_name } = this.state;

        this.props.createTeam(team_name);
    }

    handleJoinTeam() {
        const { joinID } = this.state;
        const { joinTeam } = this.props;
        if (joinID) {
            joinTeam(joinID);
        } else {
            this.setState({
                errorText: "Error, no team ID provided",
            });
        }
    }

    handleLeaveTeam() {
        const { teamID, leaveTeam } = this.props;
        if (teamID) {
            leaveTeam(teamID);
            this.setState({
                inTeam: false,
            });
        } else {
            this.setState({
                errorText: "Error, no team ID provided",
            });
        }
    }

    handleDeleteTeam() {
        const { teamID, deleteTeam } = this.props;
        if (teamID) {
            deleteTeam(teamID);
            this.setState({
                inTeam: false,
                confDelete: false,
            });
        } else {
            this.setState({
                errorText: "Error, no team ID provided",
            });
        }
    }

    handleKickUsers() {
        const { kickUsers, teamID } = this.props;
        const { selectedUsers } = this.state;

        kickUsers(selectedUsers, teamID);
        this.setState({
            selectedUsers: [],
            selectedUsersID: [],
            confKick: false,
        });
    }

    handleDialogDeleteTeam() {
        this.setState({
            confDelete: true,
        });
    }

    handleDialogDeleteUsers() {
        this.setState({
            confKick: true,
        });
    }

    prepareDataForTable(teamObj) {
        const exclude = ["team_name"];
        const tableRows = [];
        Object.keys(teamObj).forEach((uid, index) => {
            if (!exclude.includes(uid)) {
                const { email, owner } = teamObj[uid];
                tableRows.push({
                    "E-mail": email,
                    Owner: owner,
                    id: index,
                    uid,
                });
            }
        });
        return tableRows;
    }

    handleSelectingCheckbox(action) {
        const selection = this.state.selectedUsers;
        if (action.isSelected && action.data.uid !== this.props.user.uid) {
            selection.push(action.data.uid);
        } else {
            selection.splice(selection.indexOf(action.data.uid), 1);
        }
        this.setState({ multipleSelected: selection });
    }

    handleSelectionModelChange(selected) {
        this.setState({
            multipleSelected: selected.selectionModel,
        });
    }

    handleCloseDialog(which) {
        this.setState({
            [which]: false,
        });
    }

    render() {
        const { inTeam, errorText } = this.state;
        const { gettingTeam, creatingTeam, joiningTeam, team } = this.props;
        if (gettingTeam || creatingTeam || joiningTeam) {
            return <CircularProgress />;
        }

        const notInTeamDisplay = () => {
            return (
                <div className="team-action-container">
                    <div className="team-action-create">
                        <TextField
                            id="teamName"
                            label="Enter Team Name"
                            onChange={this.handleTeamNameChange}
                            size="medium"
                        />
                        <Button
                            color="primary"
                            onClick={this.handleCreateTeam}
                            variant="contained"
                            className="actionButton"
                            size="large"
                        >
                            Create Team
                        </Button>
                    </div>
                    <div className="team-action-join">
                        <TextField
                            id="joinID"
                            label="Enter join ID"
                            onChange={this.handleJoinIDChange}
                            size="medium"
                        />
                        <Button
                            color="secondary"
                            onClick={this.handleJoinTeam}
                            variant="contained"
                            className="actionButton"
                            size="large"
                        >
                            Join Team
                        </Button>
                    </div>
                </div>
            );
        };

        const inTeamDisplay = () => {
            const { team_name } = team;
            const { isOwner, teamID } = this.props;
            const table_columns = [
                {
                    field: "E-mail",
                    cellClassName: "email-cell",
                    flex: 1,
                },
                {
                    field: "Owner",
                    cellClassName: (params) =>
                        params.value
                            ? "action-cell-complete"
                            : "action-cell-incomplete",
                    flex: 1,
                },
            ];
            const table_rows = this.prepareDataForTable(team);
            return (
                <div style={{ width: "100%" }}>
                    <Typography variant="body1" style={{ padding: "1rem" }}>
                        Team: {team_name} | Team invite code: {teamID}
                    </Typography>
                    <div
                        className="action-buttons"
                        style={{ width: "100%", display: "flex" }}
                    >
                        {!isOwner && (
                            <Button
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                }}
                                variant="contained"
                                onClick={this.handleLeaveTeam}
                            >
                                Leave Team
                            </Button>
                        )}

                        {isOwner && (
                            <Button
                                style={{
                                    backgroundColor: "orange",
                                    color: "white",
                                }}
                                variant="contained"
                                onClick={this.handleDialogDeleteTeam}
                            >
                                Delete Team
                            </Button>
                        )}
                        {isOwner && (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.handleDialogDeleteUsers}
                                disabled={this.state.selectedUsers.length <= 0}
                            >
                                Kick User(s)
                            </Button>
                        )}
                    </div>
                    <div
                        style={{ width: "100%", display: "flex", flexGrow: 1 }}
                    >
                        <DataGrid
                            rows={table_rows}
                            columns={table_columns}
                            checkboxSelection={isOwner}
                            autoHeight
                            style={{
                                width: "100%",
                            }}
                            onRowSelected={this.handleSelectingCheckbox}
                            selectionModel={this.state.selectedUsers}
                            onSelectionModelChange={
                                this.handleSelectionModelChange
                            }
                        />
                    </div>
                </div>
            );
        };

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 1200 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Team</Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    {!inTeam && (
                        <Typography variant="body1" style={{ padding: "1rem" }}>
                            {text.team.teamDescriptionNoTeam}
                        </Typography>
                    )}
                    {inTeam && (
                        <Typography variant="body1" style={{ padding: "1rem" }}>
                            {text.team.teamDescriptionTeam}
                        </Typography>
                    )}
                    <Typography
                        variant="body1"
                        style={{ color: "red", textAlign: "center" }}
                    >
                        {errorText}
                    </Typography>
                </Grid>
                <Paper
                    style={{
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1rem",
                    }}
                >
                    {!inTeam && notInTeamDisplay()}
                    {inTeam && inTeamDisplay()}
                </Paper>
                <Dialog
                    open={this.state.confDelete}
                    close={(e) => {
                        this.handleCloseDialog("confClose");
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {text.dialogTitles.confirmDeleteTeam}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {text.dialogDescriptions.confirmDeleteTeam}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e) => this.handleCloseDialog("confClose")}
                        >
                            Go Back
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleDeleteTeam}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.confKick}
                    close={(e) => {
                        this.handleCloseDialog("confKick");
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {text.dialogTitles.confirmKickUsers}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {text.dialogDescriptions.confirmKickUsers}
                            User(s) to kick:
                            {this.state.selectedUsers.map((uid) => {
                                if (uid === "team_name") return;
                                return (
                                    <Typography variant="body1" key={uid}>
                                        {team[uid].email}
                                    </Typography>
                                );
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={(e) => this.handleCloseDialog("confKick")}
                        >
                            Go Back
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleKickUsers}
                        >
                            Kick
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        teamID: state.team.teamID,
        joiningTeam: state.team.joiningTeam,
        creatingTeam: state.team.creatingTeam,
        teamCreateError: state.team.teamCreateError,
        userInfo: state.auth.userInfo,
        gettingTeam: state.team.gettingTeam,
        team: state.team.team,
        gettingTeamError: state.team.gettingTeamError,
        isOwner: state.team.isOwner,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        subscribeToUserProfile: (setUnsubscribe) => {
            dispatch(subscribeToUserProfile(setUnsubscribe));
        },
        createTeam: (team_name) => {
            dispatch(createTeam(team_name));
        },
        joinTeam: (team_ID) => {
            dispatch(joinTeam(team_ID));
        },
        leaveTeam: (team_ID) => {
            dispatch(leaveTeam(team_ID));
        },
        getTeam: (team_ID, setUnsubscribe) => {
            dispatch(getTeam(team_ID, setUnsubscribe));
        },
        deleteTeam: (team_ID) => {
            dispatch(deleteTeam(team_ID));
        },
        kickUsers: (uidsToKick, team_ID) => {
            dispatch(kickUsers(uidsToKick, team_ID));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
