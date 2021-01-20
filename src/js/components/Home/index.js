import React from 'react';

import classes from '../../config/classes';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { logoutUser, resendVerificationLink } from '../../../redux/actions/authActions';

import { AppBar, Button, Box, Toolbar, IconButton, Typography, TextField } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './style/home.css';
import text from '../../config/text';
class Home extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        logoutUser: PropTypes.func,
        verificationLinkRequest: PropTypes.bool,
        verificationLinkSent: PropTypes.bool,
        verificationLinkError: PropTypes.bool,
        resendVerificationLink: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    handleLogOut = () => {
        this.props.logoutUser();
    };

    handleResendVerification = () => {
        this.props.resendVerificationLink();
    };

    render() {
        const { user, verificationLinkRequest, verificationLinkSent, verificationLinkError } = this.props;

        const { emailVerified } = user;

        const renderStatusBox = () => {
            if (emailVerified) {
                return (
                    <Box className={classes.appIncompleteBox}>
                        <Typography variant="h4">Application Incomplete</Typography>
                    </Box>
                );
            } else {
                return (
                    <div>
                        <Box className={classes.unverifiedBox}>
                            <Typography variant="h4">Please verify your email!</Typography>
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
                            {verificationLinkRequest && <Typography variant="h5">Sending verification...</Typography>}
                            {verificationLinkSent && <Typography variant="h5">Verification Link Sent!</Typography>}
                            {verificationLinkError && (
                                <Typography variant="h5">
                                    There seems to have been a problem with your verification, please try again!
                                </Typography>
                            )}
                        </Box>
                    </div>
                );
            }
        };

        const renderStatusText = () => {
            if (emailVerified) {
                return (
                    <Box className={classes.descriptionText}>
                        <Typography variant="h5">{text.incompleteApplication}</Typography>
                    </Box>
                );
            }
        };

        return (
            <div className={classes.homeContainer}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className="menu" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5">RU Hacks</Typography>
                        <div className={classes.toolbarButtons}>
                            <IconButton
                                className="logout"
                                color="inherit"
                                aria-label="menu"
                                onClick={this.handleLogOut}
                            >
                                <ExitToAppIcon type="button" variant="contained" color="secondary"></ExitToAppIcon>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

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
    console.log(state.auth);
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        isAuthenticated: state.auth.isAuthenticated,
        verificationLinkRequest: state.auth.verificationLinkRequest,
        verificationLinkSent: state.auth.verificationLinkSent,
        user: state.auth.user,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
