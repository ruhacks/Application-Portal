/*                                  App.js
Description:    This is where we route the user to the right place by checking their URL and then sending authentication variables as we receive them from our "Redux Store" if necessary
                Notable things that happen here:
                    -   We pull in "isAuthenticated" and "isVerifiying" from our redux store and send them to our ProtectedRoute
                    -   We use our own made ProtectedRoute and the react router route elements to route the user to the right place
                        -   As in send them to their home page (/) if they are authenticated or send them to /login or /register if they request it
                        -   Will probably need to add some more paths here for verifying users for various reasons
                     
*/
import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
    ProtectedRoute,
    ProtectedRouteEmailVerified,
} from "./Routes/ProtectedRoute";
import { Login } from "./Login"; //Import our login page
import Home from "./Home"; // Import our Home Page initiation
import { Register } from "./Login/Register"; //Import our Register page
import Application from "./Applications";
import { Confirmation } from "./Confirmation";
import Admin from "./Admin";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import Stats from "./Admin/Stats";

class App extends React.Component {
    // This is where we dsecribe our prop variables that we import from the mapStateToProps
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isVerifying: PropTypes.bool,
        emailVerified: PropTypes.bool,
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { isAuthenticated, isVerifying, emailVerified } = this.props;
        return (
            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <ProtectedRouteEmailVerified
                    exact
                    path="/application"
                    component={Application}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                    emailVerified={emailVerified}
                />
                <ProtectedRouteEmailVerified
                    exact
                    path="/confirmation"
                    component={Confirmation}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                    emailVerified={emailVerified}
                />
                <AdminProtectedRoute
                    path="/admin"
                    component={Admin}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }
    /*
        Send user to a route based on url given
            <ProtectedRoute /> if URL is '/'
            <Login /> if URL is '/login'
            <Register /> if URL is '/register'
    */
}

//Function for mapping variables from the redux store state to the props of our element
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
        emailVerified: state.auth.user.emailVerified,
    };
}

export default connect(mapStateToProps)(App); //Export our App element with mapstatetoprops attached to it

/* 
From here you can go to:

    - <ProtectedRoute /> or './ProtectedRoute.js' to see how we use isAuthenticated and isVerifiying to check if we should render the home page 
    - <Login /> or src/js/components/Login/Login.js to see what will render if the user accesses app via /login
    - <Register /> or src/js/components/Login/Register/Register.js to see what will render if the user accesses app via /register
    - src/redux/reducers/auth.js to see where the variables isAuthenticated and isVerifying come from and what a reducer is
*/
