import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
    Button,
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import {
    createTeam,
    getTeam,
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

        userInfo: PropTypes.object,
        team: PropTypes.object,

        getTeam: PropTypes.func,
        createTeam: PropTypes.func,

        teamID: PropTypes.string,
    };
    constructor(props) {
        super(props);

        this.state = {
            joinID: "",
            team_name: "",
            inTeam: false,
            selectedUser: [],
        };

        this.handleJoinIDChange = this.handleJoinIDChange.bind(this);
        this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
        this.handleJoinTeam = this.handleJoinTeam.bind(this);
    }

    componentDidMount() {
        if (this.props.userInfo) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(this.props.userInfo.team_ID);
                this.setState({
                    inTeam: true,
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.creatingTeam && !this.props.creatingTeam) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(this.props.userInfo.team_ID);
                this.setState({
                    inTeam: true,
                });
            } else if (this.props.teamID) {
                this.props.getTeam(this.props.teamID);
                this.setState({
                    inTeam: true,
                });
            }
        }
        if (isEmpty(prevProps.userInfo) && !isEmpty(this.props.userInfo)) {
            if (this.props.userInfo.team_ID) {
                this.props.getTeam(this.props.userInfo.team_ID);
                this.setState({
                    inTeam: true,
                });
            } else if (this.props.teamID) {
                this.props.getTeam(this.props.teamID);
                this.setState({
                    inTeam: true,
                });
            }
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
                });
            }
        });
        return tableRows;
    }

    render() {
        const { joinID, inTeam } = this.state;
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
                        Team: {team_name}
                    </Typography>
                    <div
                        style={{ width: "100%", display: "flex", flexGrow: 1 }}
                    >
                        <DataGrid
                            rows={table_rows}
                            columns={table_columns}
                            checkboxSelection
                            autoHeight
                            style={{
                                width: "100%",
                            }}
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
        getTeam: (team_ID) => {
            dispatch(getTeam(team_ID));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
