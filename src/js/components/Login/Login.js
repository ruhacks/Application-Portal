/*                                  Login.js
Description:    This is our Login page. This is where we'll handle rendering the login page, dealing with user input for it and sending the submission of credentials

                Notable things that happen here:
                    -   Render page using material ui components
                    -   Dispatch actions for submitting a login request with given credentials
                    -   Keep track of user input and change state variables containing email and password accordingly
                    -   Routing user to register page on request via register button
                    -   TODO: forgot password 
                     
*/

import React from "react";

import classes from "../../config/classes"; //import class names for components

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
    loginUser,
    sendForgotPassword,
} from "../../../redux/actions/authActions"; // import loginUser function from authentication actions

import {
    Avatar,
    Box,
    Button,
    Grid,
    Link as LinkMaterial,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { default as logo } from "../../../../assets/images/RU_RGB.svg";

class Login extends React.Component {
    //Declare prop variables types
    static propTypes = {
        classes: PropTypes.object,
        fpSent: PropTypes.bool,
        fpRequest: PropTypes.bool,
        fpFail: PropTypes.bool,
        loginUser: PropTypes.func,
        loginError: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        sendForgotPassword: PropTypes.func,
        forgotErrorObject: PropTypes.func,
    };
    constructor(props) {
        super(props);
        //init state
        this.state = {
            email: "",
            password: "",
            emailForgot: "",
            forgotMode: false,
            promptTitle: "Sign in",
            loginMsg: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Key listener that changes email state variable to whatever the email user input is on each keypress
    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    // Key listener that changes password state variable to whatever the password user input is on each keypress
    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    // Key listener that changes forgot email state variable to whatever the email user input is on each keypress
    handleForgotPasswordEmailChange = ({ target }) => {
        this.setState({ emailForgot: target.value });
    };

    // Handle submit button action
    handleSubmit = () => {
        const { email, password } = this.state; //Gather email and password from component state
        this.props.loginUser(email, password); //Call loginUser function from our props given to us via mapDispatchToProps()
    };

    handleForgotPasswordSubmit = () => {
        const { emailForgot } = this.state;
        this.props.sendForgotPassword(emailForgot);
    };

    setCloseMode = () => {
        this.setPromptTitle("Sign in");
        this.setState({
            forgotMode: false,
        });
    };

    setOpenMode = () => {
        this.setPromptTitle("Forgot Password");
        this.setState({
            forgotMode: true,
        });
    };

    setPromptTitle = (title) => {
        this.setState({
            promptTitle: title,
        });
    };

    // retrieveErrorText = (forgotErrorObject) => {
    //     return forgotErrorObject.message;
    // };

    render() {
        const {
            loginError,
            isAuthenticated,
            fpSent,
            fpRequest,
            fpFail,
            forgotErrorObject,
        } = this.props; //gather prop variables given to us from our redux store via mapStateToProps()
        const { forgotMode, promptTitle } = this.state;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            //render login page components
            return (
                <div className={classes.loginContainer}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: "100vh" }}
                    >
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar} src={logo} />
                                <Typography component="h1" variant="h5">
                                    {promptTitle}
                                </Typography>
                                {fpFail && forgotMode && (
                                    <Typography
                                        component="p"
                                        className={classes.errorText}
                                    >
                                        {forgotErrorObject &&
                                        forgotErrorObject.message
                                            ? forgotErrorObject.message
                                            : ""}
                                    </Typography>
                                )}
                                {fpSent && (
                                    <Typography
                                        component="p"
                                        className={classes.loginMsg}
                                    >
                                        A link has been sent to your email to
                                        reset your password :)
                                    </Typography>
                                )}
                                {!forgotMode && (
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            onChange={this.handleEmailChange}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            onChange={this.handlePasswordChange}
                                        />
                                        <Box m={0.5} p={0.5} width="100%">
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={this.handleSubmit}
                                            >
                                                Sign In
                                            </Button>
                                        </Box>
                                        <Box m={0.5} p={0.5} width="100%">
                                            <Button
                                                type="button"
                                                to="/register/"
                                                component={Link}
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                className={classes.register}
                                            >
                                                Register
                                            </Button>
                                        </Box>
                                        <LinkMaterial
                                            component="button"
                                            className={classes.textLink}
                                            variant="body2"
                                            onClick={this.setOpenMode}
                                        >
                                            Forgot Password?
                                        </LinkMaterial>
                                    </div>
                                )}
                                {forgotMode && (
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="emailForgot"
                                            label="Email Address"
                                            name="emailForgot"
                                            onChange={
                                                this
                                                    .handleForgotPasswordEmailChange
                                            }
                                        />
                                        {!fpRequest && (
                                            <Box m={0.5} p={0.5} width="100%">
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                    onClick={
                                                        this
                                                            .handleForgotPasswordSubmit
                                                    }
                                                >
                                                    Send Forgot Password Link
                                                </Button>
                                            </Box>
                                        )}
                                        <Box m={0.5} p={0.5} width="100%">
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                                onClick={this.setCloseMode}
                                            >
                                                Go back
                                            </Button>
                                        </Box>
                                    </div>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                    {/* <Modal
                        open={this.state.forgotMode}
                        onClose={this.setCloseMode}
                        aria-labelledby="Forgot Password"
                        aria-describedby="A pop up form for users that forgot their passwords"
                    >
                        <div className={classes.modalContainer}>
                            <Paper className={classes.paper}>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="emailForgot"
                                    label="Email Address"
                                    name="emailForgot"
                                    onChange={this.handleForgotPasswordEmailChange}
                                />
                                <Box m={0.5} p={0.5} width="100%">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleForgotPasswordSubmit}
                                    >
                                        Send Forgot Password Link
                                    </Button>
                                </Box>
                            </Paper>
                        </div>
                    </Modal> */}
                </div>
            );
        }
    }
}

// Maps required auth state variables from our store
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        fpSent: state.auth.fpSent,
        fpRequest: state.auth.fpRequest,
        fpFail: state.auth.fpFail,
        forgotErrorObject: state.auth.forgotErrorObject,
    };
}

// Map the loginUser function to our props so that it dispatches the loginUser action when called from this.props.loginUser
function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => {
            dispatch(loginUser(email, password));
        },
        sendForgotPassword: (email) => {
            dispatch(sendForgotPassword(email));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/* 
From here you can go to:
    -   authActions in src/redux/actions/authActions to see what the loginUser function does when dispatched with a user email and password
*/
