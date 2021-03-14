import {
    Button,
    CircularProgress,
    Grid,
    Link,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import text from "../../config/text";
import { CheckCircle } from "@material-ui/icons";
import { getUsersConfirmation } from "../../../redux/actions/confirmationActions";

class Confirmation extends Component {
    static propTypes = {
        confirmation: PropTypes.object,
        getUsersConfirmation: PropTypes.func,
        user: PropTypes.shape({
            uid: PropTypes.string,
        }),
    };

    componentDidMount() {
        this.props.getUsersConfirmation();
    }

    render() {
        const { user, confirmation } = this.props;

        if (!user || !user.uid || !confirmation || isEmpty(confirmation))
            return <CircularProgress />;

        const DISCORD_API_URL = `https://us-central1-ru-hacks-app-page.cloudfunctions.net/discord/authorize?token=${confirmation.token}`;

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Confirmation</Typography>
                </Grid>
                <Paper style={{ padding: 16 }}>
                    {confirmation && !confirmation.discord && (
                        <div>
                            <Typography variant="body1">
                                {text.confirmation.whyDiscord}
                            </Typography>
                            <Link rel="noopener" href={DISCORD_API_URL}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="outlined"
                                >
                                    Connect with Discord
                                </Button>
                            </Link>
                        </div>
                    )}
                    {confirmation && confirmation.discord && (
                        <div>
                            <Typography variant="body1">
                                {text.confirmation.connectedDiscord}
                            </Typography>
                            <Button
                                fullWidth
                                color="primary"
                                variant="outlined"
                                disabled
                            >
                                <CheckCircle />
                                Discord Connected
                            </Button>
                        </div>
                    )}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        confirmation: state.confirmation.conf,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsersConfirmation: () => {
            dispatch(getUsersConfirmation());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
