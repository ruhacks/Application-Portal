/* eslint-disable react/no-unescaped-entities */
import {
    Button,
    CircularProgress,
    Grid,
    Paper,
    Switch,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import { getHackSettings, setHackSettings } from "../../../../redux/actions";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
class Settings extends Component {
    static propTypes = {
        gettingSettings: PropTypes.func,
        hackathonSettings: PropTypes.object,
        setHackSettings: PropTypes.func,
        getHackSettings: PropTypes.func,
        settingSettings: PropTypes.bool,
        setSetting: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: new Date(),
            close: new Date(),
            confirm: new Date(),
            allowMinors: false,
            appOpen: false,
            confOpen: false,
        };
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.handleCloseChange = this.handleCloseChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.allowMinorsChange = this.allowMinorsChange.bind(this);
        this.setOption = this.setOption.bind(this);
        this.handleAppOpenChange = this.handleAppOpenChange.bind(this);
        this.handleConfOpenChange = this.handleConfOpenChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (
            !this.props.gettingSettings &&
            prevProps.gettingSettings &&
            this.state.loading &&
            !isEmpty(this.props.hackathonSettings)
        ) {
            this.setState({
                loading: false,
                open: this.props.hackathonSettings.timeOpen.toDate(),
                close: this.props.hackathonSettings.timeClose.toDate(),
                confirm: this.props.hackathonSettings.timeConfirm.toDate(),
                allowMinors: this.props.hackathonSettings.allowMinors,
                appOpen: this.props.hackathonSettings.appOpen,
                confOpen: this.props.hackathonSettings.confOpen,
            });
        }
        if (this.props.setSetting && this.state.loading) {
            this.setState({
                loading: false,
            });
        }
    }

    componentDidMount() {
        this.props.getHackSettings();
    }

    handleOpenChange(newDate) {
        this.setState({
            open: newDate,
        });
    }

    handleCloseChange(newDate) {
        this.setState({
            close: newDate,
        });
    }
    handleConfirmChange(newDate) {
        this.setState({
            confirm: newDate,
        });
    }
    handleAppOpenChange(newState) {
        this.setState({
            appOpen: newState.target.checked,
        });
    }
    handleConfOpenChange(newState) {
        this.setState({
            confOpen: newState.target.checked,
        });
    }
    allowMinorsChange(newState) {
        this.setState({
            allowMinors: newState.target.checked,
        });
    }
    setOption(option, value) {
        this.props.setHackSettings({ type: option, value });
        this.setState({
            loading: true,
        });
    }

    render() {
        if (this.state.loading || isEmpty(this.props.hackathonSettings))
            return <CircularProgress />;
        const {
            open,
            close,
            confirm,
            allowMinors,
            appOpen,
            confOpen,
        } = this.state;
        return (
            <div>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Settings</Typography>
                </Grid>
                {this.props.setSetting && (
                    <Typography
                        variant="body1"
                        style={{ textAlign: "center", color: "green" }}
                    >
                        {this.props.setSetting + " was sucessfully set"}
                    </Typography>
                )}

                <Typography variant="h5" style={{ textAlign: "center" }}>
                    Dashboard Visual Settings
                </Typography>
                <Paper
                    style={{
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label={"Applications Open"}
                            value={open}
                            onChange={this.handleOpenChange}
                            showTodayButton
                        />
                        <Button
                            onClick={(e) => {
                                this.setOption(
                                    "Time Applications Open",
                                    this.state.open
                                );
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Set
                        </Button>
                        <DateTimePicker
                            label={"Applications Close Date & Time"}
                            value={close}
                            onChange={this.handleCloseChange}
                            showTodayButton
                        />
                        <Button
                            onClick={(e) => {
                                this.setOption(
                                    "Time Applications Close",
                                    this.state.close
                                );
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Set
                        </Button>
                        <DateTimePicker
                            label={"Confirmations Close Date & Time"}
                            value={confirm}
                            onChange={this.handleConfirmChange}
                            showTodayButton
                        />
                        <Button
                            onClick={(e) => {
                                this.setOption(
                                    "Time Confirmations Close",
                                    this.state.close
                                );
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Set
                        </Button>
                    </MuiPickersUtilsProvider>
                </Paper>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                    State settings
                </Typography>
                <Typography
                    variant="body1"
                    style={{ textAlign: "center", color: "red" }}
                >
                    Warning: These settings WILL affect all users
                </Typography>
                <Paper
                    style={{
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1rem",
                    }}
                >
                    <Switch
                        checked={appOpen}
                        onChange={this.handleAppOpenChange}
                        name="appOpen"
                        color="primary"
                    />
                    <Typography variant="subtitle1">
                        Application Open?
                    </Typography>
                    <Button
                        onClick={(e) => {
                            this.setOption(
                                "Application State",
                                this.state.appOpen
                            );
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Set
                    </Button>
                    <Switch
                        checked={confOpen}
                        onChange={this.handleConfOpenChange}
                        name="confOpen"
                        color="primary"
                    />
                    <Typography variant="subtitle1">
                        Confirmations Open?
                    </Typography>
                    <Button
                        onClick={(e) => {
                            this.setOption(
                                "Confirmation State",
                                this.state.confOpen
                            );
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Set
                    </Button>
                    <Switch
                        checked={allowMinors}
                        onChange={this.allowMinorsChange}
                        name="allowMinors"
                        color="primary"
                    />
                    <Typography variant="subtitle1">Allow under 18?</Typography>
                    <Button
                        onClick={(e) => {
                            this.setOption(
                                "Allow Minors",
                                this.state.allowMinors
                            );
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Set
                    </Button>
                </Paper>
                <Typography variant="caption">
                    🚧 Under construction, setting these settings will work but
                    there's no loading indicator to let you know when it's set
                </Typography>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hackathonSettings: state.admin.hackathonSettings,
        gettingSettings: state.admin.gettingSettings,
        gettingSettingsError: state.admin.gettingSettingsError,
        setSetting: state.admin.setSetting,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHackSettings: () => {
            dispatch(getHackSettings());
        },
        setHackSettings: (setting) => {
            dispatch(setHackSettings(setting));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
