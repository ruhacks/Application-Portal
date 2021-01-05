import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import ProtectedRoute from './ProtectedRoute';
import { Login } from './Login';
import Home from './Home';
import { Register } from './Login/Register';

class App extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isVerifying: PropTypes.bool,
    };

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
                <Route path="/register" component={Register} />
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
