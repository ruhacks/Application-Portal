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
        value: PropTypes.string || PropTypes.bool,
    };

    render() {
        const { type, required, titleLabel, name, value } = this.props;

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
                />
            );
        } else if (type === "Boolean") {
            return (
                <FormControlLabel
                    label={titleLabel}
                    control={
                        <Checkbox
                            name={titleLabel}
                            checked={value}
                            color="primary"
                        />
                    }
                />
            );
        } else if (type === "dropdown") {
            const { options } = this.props;
            return (
                <FormControl required={required} fullWidth>
                    <InputLabel id={name}>{titleLabel}</InputLabel>
                    <Select
                        labelId={name}
                        id={name + "-select"}
                        defaultValue={value ? value : null}
                    >
                        {options.map((option) => {
                            return (
                                <MenuItem value={option} key={option}>
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
