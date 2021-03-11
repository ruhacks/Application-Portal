import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../../config/classes";
import PropTypes from "prop-types";
import { logoutUser } from "../../../redux/actions/authActions";

class Navbar extends Component {
    static propTypes = {
        user: PropTypes.object,
        logoutUser: PropTypes.func,
        emailVerified: PropTypes.bool,
        profile: PropTypes.shape({
            admitted: PropTypes.bool,
            completedProfile: PropTypes.bool,
            confirmed: PropTypes.bool,
            declined: PropTypes.bool,
            rejected: PropTypes.bool,
        }),
    };
    render() {
        const { user, logoutUser, profile } = this.props;
        const { emailVerified } = user;
        const displayConf = profile && profile.admitted;
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
                                <Button color="secondary">Application</Button>
                            </Link>
                        )}
                        {displayConf && (
                            <Link to="/confirmation">
                                <Button color="secondary">Confirmation</Button>
                            </Link>
                        )}
                        <Button color="secondary" onClick={logoutUser}>
                            Log Out
                        </Button>
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
