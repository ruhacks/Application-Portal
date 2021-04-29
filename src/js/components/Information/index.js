import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Discord from "./Discord";
import FAQ from "./FAQ";
import Hopin from "./Hopin";
import Rules from "./Rules";
import Submissons from "./Submissons";
import Welcome from "./Welcome";
import PropTypes from "prop-types";

class InformationGuideRouter extends Component {
    static propTypes = {
        admitted: PropTypes.bool,
    };
    render() {
        if (!this.props.admitted) return <Switch></Switch>;
        return (
            <Switch>
                <Route path="/discord" exact component={Discord}></Route>
                <Route path="/hopin" exact component={Hopin}></Route>
                <Route
                    path="/submitting-your-project"
                    exact
                    component={Submissons}
                ></Route>

                <Route path="/rules" exact component={Rules}></Route>
                <Route path="/faq" exact component={FAQ}></Route>
                <Route path="/" exact component={Welcome}></Route>
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return { admitted: state.auth.profile.admitted };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationGuideRouter);
