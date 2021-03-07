import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Field from "./Field";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

class AppForm extends Component {
    static propTypes = {
        application: PropTypes.object,
        fields: PropTypes.array,
    };

    constructor(props) {
        super(props);

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm = () => {
        console.log("SUBMIT");
    };

    render() {
        const { application } = this.props;

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
                    <Grid item xs={12} key={name}>
                        <Field
                            type={type}
                            required={required}
                            titleLabel={titleLabel}
                            name={keyRef}
                            key={keyRef}
                            options={fieldObj.options || []}
                            value={value}
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
                <form>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            {renderFields()}
                            <Button
                                color="primary"
                                size="medium"
                                type="button"
                                variant="container"
                                fullWidth
                                onClick={this.handleSubmitForm}
                            >
                                Submit Application
                            </Button>
                        </Grid>
                    </Paper>
                </form>
            </div>
        );
    }
}

export default AppForm;
