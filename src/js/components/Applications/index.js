import React, { Component } from "react";
import AppForm from "./AppForm";
import { connect } from "react-redux";
import {
  getApplicationFields,
  getUsersApplication,
} from "../../../redux/actions";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

class Application extends Component {
  static propTypes = {
    user: PropTypes.object,
    fields: PropTypes.array,
    getApplicationFields: PropTypes.func,
    getUsersApplication: PropTypes.func,
    application: PropTypes.object,
    isRequestingApp: PropTypes.bool,
    isRequestingFields: PropTypes.bool,
    appError: PropTypes.string,
  };

  componentDidMount() {
    const { getApplicationFields, getUsersApplication, user } = this.props;
    getApplicationFields();
    getUsersApplication(user);
  }

  render() {
    const {
      application,
      appError,
      fields,
      isRequestingApp,
      isRequestingFields,
    } = this.props;
    if (isRequestingApp || isRequestingFields || isEmpty(fields)) {
      return <CircularProgress />;
    }

    if (appError) {
      return <div> ERROR </div>;
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
    isRequestFields: state.app.isRequestFields,
    profile: state.auth.profile,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsersApplication: (user) => {
      dispatch(getUsersApplication(user));
    },
    getApplicationFields: () => {
      dispatch(getApplicationFields());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
