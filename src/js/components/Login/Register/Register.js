/*                                  Register.js
Description:    This is our Registration page. This is where we'll handle rendering the register page, dealing with user input for it and sending the submission of credentials

                Notable things that happen here:
                    -   Render page using material ui components
                    -   Dispatch actions for submitting a registration request with given credentials
                    -   Keep track of user input and change state variables containing email, password and password confirmation accordingly
                    -   Routing user to home page on registration or login on request
                     
*/
import React from 'react';

import PropTypes from 'prop-types';

import classes from '../../../config/classes'; //import class names
import text from '../../../config/text'; //Text TODO: Localize?

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Avatar, Button, TextField, Typography, Paper, Box, Grid } from '@material-ui/core';

import { default as logo } from '../../../../../assets/images/RU_RGB.svg';
import { registerUser } from '../../../../redux/actions'; //import registerUser() from registration actions in src/redux/actions/registerActions.js

class Register extends React.Component {
    //Declare prop variables types
    static propTypes = {
        verifyAuth: PropTypes.object,
        errorText: PropTypes.string,
        registrationProcessComplete: PropTypes.bool,
        registerUser: PropTypes.func,
    };
    constructor(props) {
        super(props);
        //init state
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errorText: '',
            displayErrorText: false,
            submittedRegistration: false,
        };
    }

    // Handles form submission
    handleSubmit = () => {
        const { email, password } = this.state;
        if (!this.isThereAnyError()) {
            this.setState({ submittedRegistration: true });
            this.props.registerUser(email, password);
        } else {
            this.setState({ displayErrorText: true });
        }
    };

    //Check if form for registartion is valid
    isThereAnyError = () => {
        const { email, password, password_confirm } = this.state;
        if (email !== '' && password !== '') {
            this.setState({ errorText: '' });
            return false;
        } else if (email === '' && password === '' && password_confirm === '') {
            this.setState({ errorText: text.noEmailOrPasswordOrPasswordConfirm });
        } else if (email !== '' && password === '' && password_confirm === '') {
            this.setState({ errorText: text.noPasswordOrPasswordConfirm });
        } else if (email !== '' && password !== '' && password_confirm === '') {
            this.setState({ errorText: text.noPasswordConfirm });
        } else if (password !== password_confirm) {
            this.setState({ errorText: text.passwordsDoNotMatch });
        }
        return true;
    };

    // Key listener that changes email state variable to whatever the email user input is on each keypress
    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    // Key listener that changes password state variable to whatever the password user input is on each keypress
    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    // Key listener that changes password confirmation state variable to whatever the password confirmation user input is on each keypress
    handlePasswordConfirmChange = ({ target }) => {
        this.setState({ password_confirm: target.value });
    };

    render() {
        const { registrationProcessComplete } = this.props;

        if (registrationProcessComplete) {
            return <Redirect to="/login" />; //if user is registered redirect to login
        } else {
            //Render Registration page elements
            return (
                <div className={classes.loginContainer}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar} src={logo} />
                                {!this.state.submittedRegistration && (
                                    <div id="registration_div">
                                        <Typography component="h1" variant="h5">
                                            Register
                                        </Typography>
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
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="password_confirm"
                                            label="Password Confirmation"
                                            type="password"
                                            id="password_confirm"
                                            onChange={this.handlePasswordConfirmChange}
                                        />
                                    </div>
                                )}
                                {this.state.displayErrorText && (
                                    <Typography component="p" className={classes.errorText} color="error">
                                        {this.state.errorText}
                                    </Typography>
                                )}
                                {!this.state.submittedRegistration && (
                                    <div>
                                        <Box m={0.5} width="100%">
                                            <Button
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                onClick={this.handleSubmit}
                                            >
                                                Register
                                            </Button>
                                        </Box>
                                        <Box m={0.5} p={0.5} width="100%">
                                            <Button
                                                type="button"
                                                to="/login/"
                                                component={Link}
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Go Back
                                            </Button>
                                        </Box>
                                    </div>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
}

// Maps required auth state variables from our store
function mapStateToProps(state) {
    return {
        isVerifying: state.register.isVerifying,
        registrationProcessComplete: state.register.registrationProcessComplete,
    };
}

// Map the loginUser function to our props so that it dispatches the loginUser action when called from this.props.loginUser
function mapDispatchToProps(dispatch) {
    return {
        registerUser: (email, password) => {
            dispatch(registerUser(email, password));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

/* 
From here you can go to:
    -   registerActions in src/redux/actions/registerActions.js to see what the registerUser function does when dispatched with a user email and password
*/
