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
} from "../../../redux/actions/confirmationActions";
import LocationSearchInput from "./LocationSearchInput";

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
    };

    constructor(props) {
        super(props);

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
            secondStep: false,
            mapIsReady: false,
        };
        this.firstStepComplete = this.firstStepComplete.bind(this);
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
                    secondStep: true,
                });
            }
        }
    }

    firstStepComplete(address) {
        if (address) {
            this.props.updateUsersAddress(address);
        }
        this.props.getDiscordURL();
        this.setState({
            secondStep: true,
        });
    }

    render() {
        const { user, confirmation, url, isRequestingDiscordURL } = this.props;
        const { secondStep, mapIsReady } = this.state;

        if (
            !user ||
            !user.uid ||
            !confirmation ||
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
                <Paper style={{ padding: 16 }}>
                    <LocationSearchInput
                        callbackFcn={this.firstStepComplete}
                        address={this.state.address}
                        addressUpdated={this.props.addressUpdated}
                    ></LocationSearchInput>
                    {secondStep && (
                        <div>
                            {confirmation && !confirmation.discord && (
                                <div>
                                    <Typography variant="body1">
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
                                            Error generating link, please try
                                            refreshing the page :)
                                        </Typography>
                                    )}
                                </div>
                            )}
                            {confirmation && confirmation.discord && (
                                <div>
                                    <Typography variant="body1">
                                        {text.confirmation.connectedDiscord}
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
                            )}
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
