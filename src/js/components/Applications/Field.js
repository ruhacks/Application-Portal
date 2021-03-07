import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Field extends Component {
  static propTypes = {
    name: PropTypes.string,
    required: PropTypes.bool,
    titleLabel: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    const { type, required, titleLabel, name } = this.props;
    return (
      <TextField id={name} label={titleLabel} required={required} type={type} />
    );
  }
}

export default Field;
