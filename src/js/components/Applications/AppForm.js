import { FormControl, Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import Field from "./Field";
import PropTypes from "prop-types";

class AppForm extends Component {
  static propTypes = {
    application: PropTypes.object,
    fields: PropTypes.array,
  };

  render() {
    const { application } = this.props;

    const renderFields = () => {
      const { fields } = this.props;
      //console.log(fields);
      return Object.keys(fields).map((fieldName) => {
        const field = fields[fieldName];
        return (
          <Field
            type={field.type}
            required={field.required}
            titleLabel={field.titleLabel}
            name={fieldName}
            key={fieldName}
          />
        );
      });
    };

    return (
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <form>{renderFields()}</form>
        </Grid>
      </Grid>
    );
  }
}

export default AppForm;
