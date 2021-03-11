import React from "react";

import classes from "../../config/classes";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
    resendVerificationLink,
    subscribeToUserProfile,
} from "../../../redux/actions/authActions";

import {
    AppBar,
    Button,
    Box,
    Toolbar,
    IconButton,
    Typography,
    CircularProgress,
} from "@material-ui/core";

import "./style/home.scss";
import text from "../../config/text";
import { getUsersApplication } from "../../../redux/actions/appActions";

class Home extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        logoutUser: PropTypes.func,
        subscribeToUserProfile: PropTypes.func,
        verificationLinkRequest: PropTypes.bool,
        verificationLinkSent: PropTypes.bool,
        verificationLinkError: PropTypes.bool,
        resendVerificationLink: PropTypes.func,
        gettingProfile: PropTypes.func,
        profile: PropTypes.shape({
            admitted: PropTypes.bool,
            completedProfile: PropTypes.bool,
            confirmed: PropTypes.bool,
            declined: PropTypes.bool,
            rejected: PropTypes.bool,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            cantAccesEmailNotVerified: false,
            unsubscribeFromProfile: null,
        };
        this.setUnsubscribe = this.setUnsubscribe.bind(this);
    }

    setUnsubscribe(unsubVar) {
        this.setState({
            unsubscribeFromProfile: unsubVar,
        });
    }

    componentDidMount() {
        const { subscribeToUserProfile, user, gettingProfile } = this.props;
        subscribeToUserProfile(user, this.setUnsubscribe);
    }

    componentWillUnmount() {
        if (this.state.unsubscribeFromProfile === null) return;
        this.state.unsubscribeFromProfile();
    }

    render() {
        const {
            user,
            profile,
            gettingProfile,
            verificationLinkRequest,
            verificationLinkSent,
            verificationLinkError,
        } = this.props;

        const { unsubscribeFromProfile } = this.state;

        if (!user || gettingProfile || !profile || !unsubscribeFromProfile)
            return <CircularProgress />;

        const { emailVerified } = user;
        const {
            admitted,
            completedProfile,
            confirmed,
            declined,
            rejected,
        } = profile;

        const renderStatusBox = () => {
            if (emailVerified) {
                let quickStatus = text.quickStatus.incompleteApplication;
                let componentClass = classes.app.incompleteApplication;
                if (confirmed) {
                    quickStatus = text.quickStatus.confirmed;
                    componentClass = classes.app.incompleteApplication;
                } else if (admitted) {
                    quickStatus = text.quickStatus.admitted;
                    componentClass = classes.app.admitted;
                } else if (declined) {
                    quickStatus = text.quickStatus.declined;
                    componentClass = classes.app.declined;
                } else if (rejected) {
                    quickStatus = text.quickStatus.rejected;
                    componentClass = classes.app.rejected;
                } else if (completedProfile) {
                    quickStatus = text.quickStatus.completeApplication;
                    componentClass = classes.app.completeApplication;
                }
                return (
                    <Box className={componentClass}>
                        <Typography variant="h4">{quickStatus}</Typography>
                    </Box>
                );
            } else {
                return (
                    <div>
                        <Box className={classes.unverifiedBox}>
                            <Typography variant="h4">
                                Please verify your email!
                            </Typography>
                        </Box>
                        <Box m={0.5} width="100%">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.resendVerification}
                                onClick={this.handleResendVerification}
                            >
                                Resend Verification
                            </Button>
                            {verificationLinkRequest && (
                                <Typography variant="h5">
                                    Sending verification...
                                </Typography>
                            )}
                            {verificationLinkSent && (
                                <Typography variant="h5">
                                    Verification Link Sent!
                                </Typography>
                            )}
                            {verificationLinkError && (
                                <Typography variant="h5">
                                    There seems to have been a problem with your
                                    verification, please try again!
                                </Typography>
                            )}
                        </Box>
                    </div>
                );
            }
        };

        const renderStatusText = () => {
            const {
                admitted,
                completedProfile,
                confirmed,
                declined,
                rejected,
            } = profile;

            if (emailVerified) {
                let statusText = text.statusDescription.incompleteApplication;
                if (confirmed) {
                    statusText = text.statusDescription.confirmed;
                } else if (admitted) {
                    statusText = text.statusDescription.admitted;
                } else if (completedProfile) {
                    statusText = text.statusDescription.completeApplication;
                } else if (declined) {
                    statusText = text.statusDescription.declined;
                } else if (rejected) {
                    statusText = text.statusDescription.rejected;
                }
                return (
                    <Box className={classes.descriptionText}>
                        <Typography variant="h5">{statusText}</Typography>
                    </Box>
                );
            }
        };

        return (
            <div className={classes.homeContainer}>
                <div className="qa">
                    <Typography variant="h3">Your Status: </Typography>
                    <hr />
                    {renderStatusBox()}
                    <hr />
                    {renderStatusText()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        application: state.app.app,
        isRequestingApp: state.app.isRequestingApp,
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        isAuthenticated: state.auth.isAuthenticated,
        verificationLinkRequest: state.auth.verificationLinkRequest,
        verificationLinkSent: state.auth.verificationLinkSent,
        user: state.auth.user,
        gettingProfile: state.auth.gettingProfile,
        profile: state.auth.profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
        resendVerificationLink: () => {
            dispatch(resendVerificationLink());
        },
        getApplication: (user) => {
            dispatch(getUsersApplication(user));
        },
        subscribeToUserProfile: (user, setUnsubscribe) => {
            dispatch(subscribeToUserProfile(user, setUnsubscribe));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
