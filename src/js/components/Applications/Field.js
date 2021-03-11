import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
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
        errorVar: PropTypes.bool,
        errorText: PropTypes.string,
    };

    render() {
        const {
            type,
            required,
            titleLabel,
            name,
            value,
            eventHandler,
            errorVar,
            errorText,
        } = this.props;

        if (type === "String" || type === "Integer") {
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
                    defaultValue={value ? value : ""}
                    onChange={(event) => {
                        eventHandler(event, name);
                    }}
                    error={errorVar}
                    helperText={errorText}
                />
            );
        } else if (type === "Boolean") {
            return (
                <FormControl error={errorVar} required={required}>
                    <FormControlLabel
                        label={titleLabel}
                        id={name}
                        onChange={(event) => {
                            event.target.value = event.target.checked;
                            eventHandler(event, name);
                        }}
                        control={
                            <Checkbox
                                required={required}
                                name={titleLabel}
                                color="primary"
                            />
                        }
                    />
                    {errorVar && <FormHelperText>{errorText}</FormHelperText>}
                </FormControl>
            );
        } else if (type === "dropdown") {
            const { options } = this.props;
            return (
                <FormControl error={errorVar} required={required} fullWidth>
                    <InputLabel id={name + "-label"}>{titleLabel}</InputLabel>
                    <Select
                        labelId={name + "-label"}
                        id={name}
                        defaultValue={value ? value : ""}
                        variant="outlined"
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
                    {errorVar && <FormHelperText>{errorText}</FormHelperText>}
                </FormControl>
            );
        } else {
            return <div>ERROR: UNKNOWN FIELD PROVIDED!</div>;
        }
    }
}

export default Field;
