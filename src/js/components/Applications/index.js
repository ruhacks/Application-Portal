import React, { Component } from "react";
import AppForm from "./AppForm";
import { connect } from "react-redux";
import { getUsersApplication } from "../../../redux/actions";
import {
    Button,
    CircularProgress,
    Grid,
    Link,
    Paper,
    Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { fields } from "../../config/defaultState";
import { Redirect } from "react-router-dom";

class Application extends Component {
    static propTypes = {
        user: PropTypes.object,
        fields: PropTypes.array,
        getUsersApplication: PropTypes.func,
        application: PropTypes.object,
        isRequestingApp: PropTypes.bool,
        isRequestingFields: PropTypes.bool,
        isUpdatingFields: PropTypes.bool,
        appError: PropTypes.string,
        updatedFieldsSuccessfully: PropTypes.bool,
    };

    componentDidMount() {
        const { getUsersApplication, user } = this.props;
        getUsersApplication(user);
    }

    componentWillUnmount() {
        //disable updatedFieldsSuccessfully
    }

    render() {
        const {
            application,
            appError,
            isRequestingApp,
            isUpdatingFields,
            updatedFieldsSuccessfully,
        } = this.props;

        if (isRequestingApp || isUpdatingFields) {
            return <CircularProgress />;
        }

        if (appError) {
            return <div> ERROR </div>;
        }

        if (updatedFieldsSuccessfully) {
            return <Redirect to="/" />;
        }

        return <AppForm application={application} fields={fields} />;
    }
}

function mapStateToProps(state) {
    return {
        application: state.app.app,
        appError: state.app.appError,
        fields: state.app.fields,
        gettingProfile: state.auth.gettingProfile,
        isRequestingApp: state.app.isRequestingApp,
        isUpdatingFields: state.app.isUpdatingFields,
        updatedFieldsSuccessfully: state.app.updatedFieldsSuccessfully,
        profile: state.auth.profile,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsersApplication: (user) => {
            dispatch(getUsersApplication(user));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
