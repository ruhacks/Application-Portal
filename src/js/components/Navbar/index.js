import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from '../../config/classes';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../redux/actions/authActions';

class Navbar extends Component {
    static propTypes = {
        user: PropTypes.object,
        logoutUser: PropTypes.func,
        emailVerified: PropTypes.bool,
    };
    render() {
        const { user, logoutUser } = this.props;
        const { emailVerified } = user;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">RU Hacks</Typography>

                    <div className={classes.toolbarButtons}>
                        <Link to="/">
                            <Button color="secondary">Home</Button>
                        </Link>
                        {emailVerified && (
                            <Link to="/application">
                                <IconButton className="logout" color="inherit" aria-label="menu">
                                    <Chat type="button" variant="contained" color="secondary" />
                                </IconButton>
                            </Link>
                        )}
                        <IconButton className="logout" color="inherit" aria-label="menu" onClick={logoutUser}>
                            <ExitToAppIcon type="button" variant="contained" color="secondary"></ExitToAppIcon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
