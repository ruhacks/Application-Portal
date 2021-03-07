import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Field extends Component {
    static propTypes = {
        name: PropTypes.string,
        required: PropTypes.bool,
        titleLabel: PropTypes.string,
        type: PropTypes.string,
        options: PropTypes.array,
        value: PropTypes.any,
        eventHandler: PropTypes.func,
    };

    render() {
        const {
            type,
            required,
            titleLabel,
            name,
            value,
            eventHandler,
        } = this.props;

        if (type === "String" || type === "number") {
            return (
                <TextField
                    id={name}
                    label={titleLabel}
                    fullWidth
                    multiline
                    rowsMax={4}
                    required={required}
                    type={type}
                    variant="outlined"
                    defaultValue={value}
                    onChange={(event) => {
                        eventHandler(event, name);
                    }}
                />
            );
        } else if (type === "Boolean") {
            return (
                <FormControlLabel
                    label={titleLabel}
                    id={name}
                    onChange={(event) => {
                        eventHandler(event, name);
                    }}
                    control={<Checkbox name={titleLabel} color="primary" />}
                />
            );
        } else if (type === "dropdown") {
            const { options } = this.props;
            return (
                <FormControl required={required} fullWidth>
                    <InputLabel id={name + "-label"}>{titleLabel}</InputLabel>
                    <Select
                        labelId={name + "-label"}
                        id={name}
                        defaultValue={value ? value : ""}
                        onChange={(event) => {
                            eventHandler(event, name);
                        }}
                    >
                        {options.map((option) => {
                            return (
                                <MenuItem value={option} key={option} id={name}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            );
        } else {
            return <div>ERROR: UNKNOWN FIELD PROVIDED!</div>;
        }
    }
}

export default Field;
