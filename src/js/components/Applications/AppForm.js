import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Field from "./Field";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { fieldKeys } from "../../config/defaultState";
import classes from "../../config/classes";

class AppForm extends Component {
    static propTypes = {
        application: PropTypes.object,
        fields: PropTypes.array,
        setUsersApplication: PropTypes.func,
    };

    constructor(props) {
        super(props);

        const getStateVars = () => {
            let vars = {};

            //Map app vars to state
            props.fields.forEach((field) => {
                const { keyRef, type } = field;

                let value = null;

                if (props.application && !isEmpty(props.application)) {
                    if (Object.keys(props.application).includes(keyRef)) {
                        value = props.application[keyRef];
                    }
                }

                vars[keyRef] = {
                    value: "",
                    error: false,
                    errorText: "",
                };

                if (type === "Boolean") {
                    vars[keyRef].value = value !== null ? value : false;
                } else if (type === "Integer") {
                    vars[keyRef].value = value !== null ? value : 0;
                } else if (type === "dropdown") {
                    vars[keyRef].value = value !== null ? value : "";
                } else {
                    vars[keyRef].value = value !== null ? value : "";
                }
            });
            return vars;
        };

        this.state = {
            errorText: "",
            applicationData: getStateVars(),
        };

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleVarChange = (e, stateVar) => {
        const { value } = e.target; //pull out value & id from input
        this.setState((prevState) => ({
            applicationData: {
                ...prevState.applicationData,
                [`${stateVar}`]: {
                    value,
                    error: false,
                    errorText: "",
                },
            },
        }));
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        const { setUsersApplication } = this.props;

        this.setState({
            errorText: "",
        });

        if (this.validateForm() === false) {
            this.setState({
                errorText: "There seems to be a problem in your submission",
            });
        } else {
            const convertedStateVars = {};
            //Convert local state vars to what it would look like in firestore
            Object.keys(this.state.applicationData).forEach((fieldName) => {
                convertedStateVars[fieldName] = this.state.applicationData[
                    fieldName
                ].value;
            });
            convertedStateVars["submittedAt"] = new Date();
            setUsersApplication(convertedStateVars);
        }
    };

    validateForm = () => {
        const { fields } = this.props;
        let requiredValidation = true,
            typeValidation = true,
            limitValidation = true,
            optionValidation = true;
        Object.keys(this.state.applicationData).forEach((appVar) => {
            if (fieldKeys.includes(appVar)) {
                fields.forEach((fieldDetails) => {
                    const checkValue = this.state.applicationData[appVar].value;

                    if (fieldDetails.keyRef === appVar) {
                        //Redundant check to see if required fields are filled
                        if (
                            fieldDetails.required &&
                            (!checkValue || checkValue === 0)
                        ) {
                            this.setState((prevState) => ({
                                applicationData: {
                                    ...prevState.applicationData,
                                    [`${appVar}`]: {
                                        error: true,
                                        errorText: "This field is required!",
                                    },
                                },
                            }));
                            requiredValidation = false;
                        }
                        switch (fieldDetails.type) {
                            case "Integer":
                                if (isNaN(checkValue)) {
                                    typeValidation = false;
                                    this.setState((prevState) => ({
                                        applicationData: {
                                            ...prevState.applicationData,
                                            [`${appVar}`]: {
                                                error: true,
                                                errorText:
                                                    "Field is not a number",
                                            },
                                        },
                                    }));
                                }
                                if (fieldDetails.limit) {
                                    const numVal = parseInt(checkValue);
                                    const lim = fieldDetails.limit;
                                    if (lim.length === 2) {
                                        if (
                                            numVal < lim[0] ||
                                            numVal > lim[1]
                                        ) {
                                            this.setState((prevState) => ({
                                                applicationData: {
                                                    ...prevState.applicationData,
                                                    [`${appVar}`]: {
                                                        error: true,
                                                        errorText:
                                                            "Field is outside of acceptable range. Acceptable range is " +
                                                            lim[0] +
                                                            "< input <" +
                                                            lim[1],
                                                    },
                                                },
                                            }));
                                        }
                                    } //TODO: Maybe add features for 1 number limits
                                }

                            case "String":
                                if (
                                    fieldDetails.charLimit &&
                                    fieldDetails.charLimit < checkValue.length
                                ) {
                                    limitValidation = false;
                                    this.setState((prevState) => ({
                                        applicationData: {
                                            ...prevState.applicationData,
                                            [`${appVar}`]: {
                                                error: true,
                                                errorText:
                                                    "Field is too large. Acceptable length is " +
                                                    fieldDetails.charLimit +
                                                    " length",
                                            },
                                        },
                                    }));
                                }

                            case "dropdown":
                                if (
                                    fieldDetails.options &&
                                    !fieldDetails.options.includes(checkValue)
                                ) {
                                    optionValidation = false;
                                    this.setState((prevState) => ({
                                        applicationData: {
                                            ...prevState.applicationData,
                                            [`${appVar}`]: {
                                                error: true,
                                                errorText:
                                                    "Invalid selection, please try again!",
                                            },
                                        },
                                    }));
                                }
                        }
                    }
                });
            }
        });

        return (
            requiredValidation &&
            typeValidation &&
            limitValidation &&
            optionValidation
        );
    };

    render() {
        const { application } = this.props;
        const { errorText } = this.state;

        const emptyApplication = isEmpty(application);
        const renderFields = () => {
            const { fields } = this.props;
            return fields.map((fieldObj) => {
                const {
                    keyRef,
                    required,
                    titleLabel,
                    type,
                    link,
                    maxSize,
                    initialSize,
                    staticLinkText,
                } = fieldObj;

                let value = false;
                //Apply value if it exists in the user's application
                if (!emptyApplication) {
                    if (Object.keys(application).includes(keyRef)) {
                        value = application[keyRef];
                    }
                }
                return (
                    <Grid item xs={12} key={keyRef}>
                        <Field
                            type={type} //Type of field
                            required={required} // If field is required or not
                            titleLabel={titleLabel} //Label Title
                            name={keyRef} //name
                            key={keyRef} //key
                            options={fieldObj.options || []} //Options for dropdowns
                            value={value} //Value if set from application
                            eventHandler={this.handleVarChange} //Sets appropriate state variables for field
                            errorVar={this.state.applicationData[keyRef].error} //Determines if there is an error for each component (i.e. should it highlight red?)
                            errorText={
                                this.state.applicationData[keyRef].errorText
                            } //For displaying error text
                            link={link ? link : false}
                            initialSize={initialSize ? initialSize : 1}
                            maxSize={maxSize ? maxSize : 3}
                            staticLinkText={
                                staticLinkText ? staticLinkText : ""
                            }
                        />
                    </Grid>
                );
            });
        };

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 1200 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Application</Typography>
                </Grid>
                <hr></hr>
                <Paper style={{ padding: 16, margin: "2rem" }}>
                    <Typography component="p" className={classes.errorText}>
                        {errorText}
                    </Typography>
                    <form id="mainForm" onSubmit={this.handleSubmitForm}>
                        <Grid container alignItems="flex-start" spacing={3}>
                            {renderFields()}
                            {this.props.setUsersApplication && (
                                <Button
                                    color="primary"
                                    size="medium"
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    Submit Application
                                </Button>
                            )}
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default AppForm;
