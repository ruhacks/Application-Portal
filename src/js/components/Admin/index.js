import {
    AppBar,
    Box,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Stats from "./Stats";
import PropTypes from "prop-types";

import Users from "./Users";
import Settings from "./Settings";
import Event from "./Event";

function TabPanel(props) {
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 0,
        };

        this.handleSwitchViews = this.handleSwitchViews.bind(this);
    }

    handleSwitchViews = (event, newValue) => {
        this.setState({
            view: newValue,
        });
    };

    render() {
        const { view } = this.state;

        return (
            <div style={{ padding: 16, margin: "auto", maxWidth: 1200 }}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: "1rem" }}
                >
                    <Typography variant="h2">Admin</Typography>
                </Grid>
                <Paper style={{ padding: 16 }}>
                    <AppBar position="static">
                        <Tabs
                            value={view}
                            onChange={this.handleSwitchViews}
                            aria-label="Admin Nav"
                            variant="fullWidth"
                        >
                            <Tab label="Statistics" key="Statistics" />
                            <Tab label="Users" key="Users" />
                            <Tab label="Settings" key="Settings" />
                            <Tab
                                label="Create an Event"
                                key="Create an Event"
                            />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={view} index={0}>
                        <Stats />
                    </TabPanel>
                    <TabPanel value={view} index={1}>
                        <Users />
                    </TabPanel>
                    <TabPanel value={view} index={2}>
                        <Settings />
                    </TabPanel>
                    <TabPanel value={view} index={3}>
                        <Event />
                    </TabPanel>
                </Paper>
            </div>
        );
    }
}

export default connect(null, null)(Admin);
