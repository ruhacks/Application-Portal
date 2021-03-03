import { TextField } from '@material-ui/core';
import React, { Component } from 'react';


class Field extends Component {
    render() {
        const { type, required, titleLabel, name } = this.props
        return (
            <TextField
                id={name}
                label={titleLabel}
                required={required}
                type={type}
            />
        )
    }
}

export default Field