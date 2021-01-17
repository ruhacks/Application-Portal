/*                                  Login.js
Description:    This is our Login page. This is where we'll handle rendering the login page, dealing with user input for it and sending the submission of credentials

                Notable things that happen here:
                    -   Render page using material ui components
                    -   Dispatch actions for submitting a login request with given credentials
                    -   Keep track of user input and change state variables containing email and password accordingly
                    -   Routing user to register page on request via register button
                    -   TODO: forgot password 
                     
*/

import React from 'react';

import classes from '../../config/classes'; //import class names for components

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { loginUser } from '../../../redux/actions/authActions'; // import loginUser function from authentication actions

import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { default as logo } from '../../../../assets/images/RU_RGB.svg';

import './style/login.css';

class Login extends React.Component {
    //Declare prop variables types
    static propTypes = {
        classes: PropTypes.object,
        loginUser: PropTypes.func,
        loginError: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        //init state
        this.state = {
            email: '',
            password: '',
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

    // Handle submit button action
    handleSubmit = () => {
        const { email, password } = this.state; //Gather email and password from component state
        this.props.loginUser(email, password); //Call loginUser function from our props given to us via mapDispatchToProps()
    };

    render() {
        const { loginError, isAuthenticated } = this.props; //gather prop variables given to us from our redux store via mapStateToProps()

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
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar} src={logo} />
                                <Typography component="h1" variant="h5">
                                    Sign in
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
                                {loginError && (
                                    <Typography component="p" className={classes.errorText}>
                                        Incorrect email or password.
                                    </Typography>
                                )}
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
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

// Map the loginUser function to our props so that it dispatches the loginUser action when called from this.props.loginUser
function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => {
            dispatch(loginUser(email, password));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/* 
From here you can go to:
    -   authActions in src/redux/actions/authActions to see what the loginUser function does when dispatched with a user email and password
*/
