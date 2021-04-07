/* eslint-disable react/no-unescaped-entities */
import {
    Button,
    CircularProgress,
    Grid,
    Link,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import text from "../../config/text";
import { CheckCircle } from "@material-ui/icons";
import {
    getUsersConfirmation,
    getDiscordURL,
    updateUsersAddress,
    uploadFile,
} from "../../../redux/actions/confirmationActions";
import LocationSearchInput from "./LocationSearchInput";
import classes from "../../config/classes";
import { Link as RouterLink } from "react-router-dom";

class Confirmation extends Component {
    static propTypes = {
        confirmation: PropTypes.object,
        getUsersConfirmation: PropTypes.func,
        user: PropTypes.shape({
            uid: PropTypes.string,
        }),
        isRequestingDiscordURL: PropTypes.bool,
        url: PropTypes.string,
        updateUsersAddress: PropTypes.func,
        getDiscordURL: PropTypes.func,
        addressUpdated: PropTypes.bool,
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        uploadFile: PropTypes.func,
        uploadSuccess: PropTypes.bool,
        isUploading: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        const fromDiscord = new URLSearchParams(props.location.search).get(
            "fromDiscord"
        );
        this.state = {
            address: {
                street_number: "",
                street_address: "",
                second_address: "",
                city: "",
                state: "",
                postal_code: "",
                country: "",
                googleMapLink: "",
                receivedFromFirestore: false,
            },
            firstStep: fromDiscord ? false : true,
            secondStep: fromDiscord ? true : false,
            uploading: false,
            percent: 0,
            file: false,
            fileName: "Choose a file...",
            error: "",
            mapIsReady: false,
        };
        this.firstStepComplete = this.firstStepComplete.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    componentDidMount() {
        const ApiKey = "AIzaSyAJREtfwTwXf8G94n6tc4nvhlLIFE2nNlg";
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => {
            this.setState({ mapIsReady: true });
        });
        document.body.appendChild(script);
        this.props.getUsersConfirmation();
    }

    componentDidUpdate(prevProps) {
        if (
            isEmpty(prevProps.confirmation) &&
            !isEmpty(this.props.confirmation)
        ) {
            this.props.getDiscordURL();
            if (!isEmpty(this.props.confirmation.address)) {
                const {
                    city,
                    country,
                    postal_code,
                    second_address,
                    state,
                    street_address,
                    street_number,
                    googleMapLink,
                } = this.props.confirmation.address;
                this.setState({
                    address: {
                        city,
                        country,
                        postal_code,
                        second_address,
                        state,
                        street_address,
                        street_number,
                        googleMapLink,
                        receivedFromFirestore: true,
                    },
                });
            }
        }
        if (!prevProps.uploadSuccess && this.props.uploadSuccess) {
            this.props.getUsersConfirmation();
        }
    }

    firstStepComplete(address) {
        if (address) {
            this.props.updateUsersAddress(address);
        }
        this.props.getDiscordURL();
        this.setState({
            firstStep: false,
            secondStep: true,
        });
    }

    handleFileUpload(e) {
        e.preventDefault();
        this.props.uploadFile(this.state.file);
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        this.setState({
            file,
            fileName: file.name,
        });
    }

    render() {
        const {
            user,
            confirmation,
            url,
            isRequestingDiscordURL,
            isUploading,
        } = this.props;
        const {
            firstStep,
            secondStep,
            mapIsReady,
            error,
            file,
            fileName,
        } = this.state;

        if (
            !user ||
            !user.uid ||
            !confirmation ||
            isUploading ||
            isEmpty(confirmation) ||
            (!url && secondStep) ||
            (!mapIsReady && !secondStep)
        )
            return <CircularProgress />;

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Confirmation</Typography>
                </Grid>
                <Typography variant="body1" style={{ color: "red" }}>
                    {error}
                </Typography>
                <Paper style={{ padding: 16 }}>
                    {firstStep && (
                        <LocationSearchInput
                            callbackFcn={this.firstStepComplete}
                            address={this.state.address}
                            addressUpdated={this.props.addressUpdated}
                        ></LocationSearchInput>
                    )}
                    {secondStep && (
                        <div>
                            <div className={classes.resumeContainer}>
                                <Typography
                                    variant="body1"
                                    style={{ padding: "1rem" }}
                                >
                                    {text.confirmation.uploadResume}
                                </Typography>
                                <input
                                    type="file"
                                    accept="application/pdf|application/doc"
                                    className={classes.uploadFile}
                                    id="contained-button-file"
                                    onChange={this.handleFileSelect}
                                    hidden
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        component="span"
                                        fullWidth
                                    >
                                        {fileName}
                                    </Button>
                                </label>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    component="span"
                                    disabled={!file}
                                    onClick={this.handleFileUpload}
                                    fullWidth
                                >
                                    Upload
                                </Button>
                                {confirmation && confirmation.resume && (
                                    <div
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            style={{ color: "green" }}
                                        >
                                            Last upload:{" "}
                                            {confirmation.resume.fileName +
                                                " at "}
                                            {confirmation.resume.timeCreated
                                                .toDate()
                                                .toLocaleString()}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                            <div className={classes.discordContainer}>
                                {confirmation && !confirmation.discord && (
                                    <div>
                                        <Typography
                                            variant="body1"
                                            style={{ padding: "1rem" }}
                                        >
                                            {text.confirmation.whyDiscord}
                                        </Typography>
                                        {isRequestingDiscordURL && (
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="outlined"
                                            >
                                                Please wait, generating link...
                                                <CircularProgress />
                                            </Button>
                                        )}
                                        {url && (
                                            <Link
                                                rel="noopener"
                                                href={url}
                                                target="_blank"
                                            >
                                                <Button
                                                    fullWidth
                                                    color="primary"
                                                    variant="outlined"
                                                >
                                                    Connect with Discord
                                                </Button>
                                            </Link>
                                        )}
                                        {!url && !isRequestingDiscordURL && (
                                            <Typography
                                                variant="body1"
                                                color="error"
                                            >
                                                Error generating link, please
                                                try refreshing the page :)
                                            </Typography>
                                        )}
                                    </div>
                                )}
                                {confirmation && confirmation.discord && (
                                    <div>
                                        <div style={{ padding: "1rem" }}>
                                            <Typography variant="body1">
                                                {
                                                    text.confirmation
                                                        .connectedDiscord
                                                }
                                            </Typography>
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="outlined"
                                                disabled
                                            >
                                                <CheckCircle />
                                                Discord Connected
                                            </Button>
                                        </div>
                                        <RouterLink to="/">
                                            <Button
                                                fullWidth
                                                color="secondary"
                                                variant="contained"
                                            >
                                                You're done! Click here to go
                                                back home
                                            </Button>
                                        </RouterLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        confirmation: state.confirmation.conf,
        url: state.confirmation.url,
        isRequestingDiscordURL: state.confirmation.isRequestingDiscordURL,
        addressUpdated: state.confirmation.addressUpdated,
        isUploading: state.confirmation.isUploading,
        uploadSuccess: state.confirmation.uploadSuccess,
        uploadError: state.confirmation.uploadError,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsersConfirmation: () => {
            dispatch(getUsersConfirmation());
        },
        getDiscordURL: () => {
            dispatch(getDiscordURL());
        },
        updateUsersAddress: (address) => {
            dispatch(updateUsersAddress(address));
        },
        uploadFile: (file) => {
            dispatch(uploadFile(file));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
