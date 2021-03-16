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
} from "../../../redux/actions/confirmationActions";

class Confirmation extends Component {
    static propTypes = {
        confirmation: PropTypes.object,
        getUsersConfirmation: PropTypes.func,
        user: PropTypes.shape({
            uid: PropTypes.string,
        }),
        isRequestingDiscordURL: PropTypes.bool,
        url: PropTypes.string,

        getDiscordURL: PropTypes.func,
    };

    componentDidMount() {
        this.props.getUsersConfirmation();
        this.props.getDiscordURL();
    }

    render() {
        const { user, confirmation, url, isRequestingDiscordURL } = this.props;

        if (
            !user ||
            !user.uid ||
            !confirmation ||
            isEmpty(confirmation) ||
            !url
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
                                <Link rel="noopener" href={url} target="_blank">
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
                                <Typography variant="body1" color="error">
                                    Error generating link, please try refreshing
                                    the page :)
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
