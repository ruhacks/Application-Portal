import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { verifyAdminWithDB } from "../../../redux/actions/adminActions";
import Navbar from "../Navbar";
import PropTypes from "prop-types";
class ProtectedRouteAdmin extends Component {
    static propTypes = {
        component: Component,
        isAuthenticated: PropTypes.bool,
        verifyingAdmin: PropTypes.bool,
        admin: PropTypes.bool,
        isVerifying: PropTypes.bool,
        adminErr: PropTypes.bool,
        verifyAdminWithDB: PropTypes.func,
    };

    componentDidUpdate(prevProps) {
        if (!this.props.isVerifying && prevProps.isVerifying) {
            this.props.verifyAdminWithDB();
        }
    }
    PropTypes;

    render() {
        const {
            component: Component,
            isAuthenticated,
            verifyingAdmin,
            admin,
            isVerifying,
            adminErr,
        } = this.props;

        return (
            <Route
                render={(props) =>
                    verifyingAdmin ||
                    isVerifying ||
                    (!verifyingAdmin && !adminErr) ? (
                        <CircularProgress />
                    ) : isAuthenticated && admin ? (
                        <div>
                            <Navbar />
                            <Component {...props} />
                        </div>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location,
                                    cantAccesEmailNotVerified: true,
                                },
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
        verifyingAdmin: state.admin.verifyingAdmin,
        admin: state.admin.admin,
        adminErr: state.admin.admin,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRouteAdmin);
