import React from 'react';

import PropTypes from 'prop-types';

import classes from '../../../config/classes';
import text from '../../../config/text';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Avatar, Button, TextField, Typography, Paper, Box, Grid } from '@material-ui/core';

import { default as logo } from '../../../../../assets/images/RU_RGB.svg';
import { registerUser } from '../../../../redux/actions';

class Register extends React.Component {
    static propTypes = {
        verifyAuth: PropTypes.object,
        errorText: PropTypes.string,
        registrationProcessComplete: PropTypes.bool,
        registerUser: PropTypes.func,
    };
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errorText: '',
            displayErrorText: false,
            submittedRegistration: false,
        };
    }

    handleSubmit = () => {
        const { email, password } = this.state;
        if (!this.isThereAnyError()) {
            this.setState({ submittedRegistration: true });
            this.props.registerUser(email, password);
        } else {
            this.setState({ displayErrorText: true });
        }
    };

    //Will return message if error or false if not
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

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handlePasswordConfirmChange = ({ target }) => {
        this.setState({ password_confirm: target.value });
    };

    render() {
        const { registrationProcessComplete } = this.props;
        if (registrationProcessComplete) {
            return <Redirect to="/login" />;
        } else {
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

function mapStateToProps(state) {
    console.log(state);
    return {
        isVerifying: state.register.isVerifying,
        registrationProcessComplete: state.register.registrationProcessComplete,
    };
}

function mapDispatchToProps(dispatch) {
    console.log('INNNN');

    return {
        registerUser: (email, password) => {
            dispatch(registerUser(email, password));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
