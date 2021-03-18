import {
    AppBar,
    Box,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import PropTypes from "prop-types";

import Stats from "./Stats";
import Users from "./Users";
import Settings from "./Settings";
import Event from "./Event";

import AdminProtectedRoute from "../Routes/AdminProtectedRoute";

class Admin extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/stats" component={Stats} />
                <Route exact path="/admin/users" component={Users} />
                <Route exact path="/admin/settings" component={Settings} />
                <Route exact path="/admin/event" component={Event} />
            </Switch>
        );
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        emailVerified: state.auth.user.emailVerified,
    };
}

export default connect(mapStateToProps)(Admin);
