import React from 'react';

import classes from '../../config/classes';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../../../redux/actions/authActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import './style/login.css'

import { default as logo } from '../../../../assets/images/RU_RGB.svg'

class Login extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        loginUser: PropTypes.func,
        loginError: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const { email, password } = this.state;
        this.props.loginUser(email, password);
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handleRegister = () => {
        console.log('pressed register!')
    }

    render() {
        const { loginError, isAuthenticated } = this.props;

        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <img src={logo} alt='RU Hacks' className={classes.logo}/>
                        </Avatar>
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
                        <Box m={0.5} width="100%">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Box m={0.5} width="100%">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.register}
                                onClick={this.handle}
                            >
                                Register
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => {
            dispatch(loginUser(email, password))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
