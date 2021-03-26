import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
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
        link: PropTypes.string,
        initialSize: PropTypes.string,
        maxSize: PropTypes.string,
        staticLinkText: PropTypes.string,
        disableAllFields: PropTypes.bool,
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
            link,
            initialSize,
            maxSize,
            staticLinkText,
            disableAllFields,
        } = this.props;

        if (type === "String" || type === "Integer") {
            return (
                <TextField
                    id={name}
                    label={titleLabel}
                    fullWidth
                    multiline
                    rows={initialSize}
                    rowsMax={maxSize}
                    required={required}
                    type={type}
                    variant="standard"
                    defaultValue={value ? value : ""}
                    onChange={(event) => {
                        eventHandler(event, name);
                    }}
                    error={errorVar}
                    helperText={errorText}
                    inputProps={{ style: { fontSize: 20 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                    disabled={disableAllFields}
                />
            );
        } else if (type === "Boolean") {
            return (
                <FormControl error={errorVar} required={required}>
                    <FormControlLabel
                        label={
                            link ? (
                                <span>
                                    <Typography variant="body1">
                                        {titleLabel}

                                        <Link
                                            href={link}
                                            target="_blank"
                                            style={{
                                                position: "relative",
                                                zIndex: 1000,
                                            }}
                                        >
                                            {staticLinkText}
                                        </Link>
                                    </Typography>
                                </span>
                            ) : (
                                titleLabel
                            )
                        }
                        disabled={disableAllFields}
                        id={name}
                        control={
                            <Checkbox
                                required={required}
                                name={titleLabel}
                                color="primary"
                                style={{ pointerEvents: "auto" }}
                                onChange={(event) => {
                                    event.target.value = event.target.checked;
                                    eventHandler(event, name);
                                }}
                            />
                        }
                    />
                    {errorVar && <FormHelperText>{errorText}</FormHelperText>}
                </FormControl>
            );
        } else if (type === "dropdown") {
            const { options } = this.props;
            return (
                <FormControl
                    error={errorVar}
                    required={required}
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                    disabled={disableAllFields}
                >
                    <InputLabel style={{ fontSize: 20 }} id={name + "-label"}>
                        {titleLabel}
                    </InputLabel>
                    <Select
                        label={titleLabel}
                        id={name}
                        defaultValue={value ? value : ""}
                        onChange={(event) => {
                            eventHandler(event, name);
                        }}
                        inputProps={{ style: { fontSize: 20 } }} // font size of input text
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
