import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login/Login';
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isAuthenticated, isVerifying } = this.props;
        return (
            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
    };
}

export default connect(mapStateToProps)(App);
