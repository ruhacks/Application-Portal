import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { verifyAdminWithDB } from "../../../redux/actions/adminActions";
import Navbar from "../Navbar";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import DashboardWrapper from "../DashboardWrapper";

class ProtectedRouteAdmin extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isVerifying: PropTypes.bool,
        verifyingAdmin: PropTypes.bool,
        admin: PropTypes.bool,
        verifyingAdmin: PropTypes.bool,
        adminErr: PropTypes.bool,
        verifyAdminWithDB: PropTypes.func,
        component: PropTypes.any,
        adminProfile: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.props.verifyAdminWithDB();

        this.setState({
            loading: false,
        });
    }

    render() {
        const {
            component: Component,
            isAuthenticated,
            admin,
            verifyingAdmin,
            adminProfile,
            isVerifying,
            adminErr,
            ...rest
        } = this.props;
        return (
            <Route
                {...rest}
                render={(props) =>
                    isVerifying || verifyingAdmin || this.state.loading ? (
                        <CircularProgress />
                    ) : !isEmpty(adminProfile) && admin && isAuthenticated ? (
                        <DashboardWrapper>
                            <Component {...props} />
                        </DashboardWrapper>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        verifyAdminWithDB: () => {
            dispatch(verifyAdminWithDB());
        },
    };
}

function mapStateToProps(state) {
    return {
        adminErr: state.admin.adminErr,
        adminProfile: state.admin.adminProfile,
        verifyingAdmin: state.admin.verifyingAdmin,
        admin: state.admin.admin,
        profile: state.auth.profile,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRouteAdmin);
