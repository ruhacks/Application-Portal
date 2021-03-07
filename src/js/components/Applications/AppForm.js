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

                if (type === "Boolean") {
                    vars[keyRef] = value !== null ? value : false;
                } else if (type === "number") {
                    vars[keyRef] = value !== null ? value : 0;
                } else {
                    vars[keyRef] = value !== null ? value : "";
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

        this.setState({ applicationData: { [`${stateVar}`]: value } }); //SEt to appropriate state var
    };

    handleSubmitForm = (event) => {
        event.preventDefault();

        this.setState({
            errorText: "",
        });

        if (this.validateForm() === false) {
            this.setState({
                errorText: "There seems to be a problem in your submission",
            });
        }
    };

    validateForm = () => {
        let localFormValidated = false;
        const { fields } = this.props;
        /*
        Object.keys(this.state).forEach((appVar) => {
            if (fieldKeys.includes(appVar)) {
                fields.forEach(fieldDetails => {

                })
            }
        });
        */
        return localFormValidated;
    };

    render() {
        const { application } = this.props;
        const { errorText } = this.state;

        const emptyApplication = isEmpty(application);
        const renderFields = () => {
            const { fields } = this.props;
            return fields.map((fieldObj) => {
                const { keyRef, required, titleLabel, type } = fieldObj;

                let value = false;
                if (!emptyApplication) {
                    if (Object.keys(application).includes(keyRef)) {
                        value = application[keyRef];
                    }
                }

                return (
                    <Grid item xs={12} key={keyRef}>
                        <Field
                            type={type}
                            required={required}
                            titleLabel={titleLabel}
                            name={keyRef}
                            key={keyRef}
                            options={fieldObj.options || []}
                            value={value}
                            eventHandler={this.handleVarChange}
                        />
                    </Grid>
                );
            });
        };

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Application</Typography>
                </Grid>

                <Paper style={{ padding: 16 }}>
                    <Typography component="p" className={classes.errorText}>
                        {errorText}
                    </Typography>
                    <form id="mainForm" onSubmit={this.handleSubmitForm}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            {renderFields()}
                            <Button
                                color="primary"
                                size="medium"
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Submit Application
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default AppForm;
