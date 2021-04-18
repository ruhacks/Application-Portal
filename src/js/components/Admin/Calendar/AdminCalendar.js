import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEvent } from "../../../../redux/actions";
import PropTypes from "prop-types";

class AdminCalendar extends Component {
    static propTypes = {
        deleteEvent: PropTypes.func,
    };
    constructor(props) {
        super(props);

        this.state = {
            event_ID: "",
            day: "",
        };
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleEventIDChange = this.handleEventIDChange.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEventIDChange({ target }) {
        this.setState({
            event_ID: target.value,
        });
    }

    handleDayChange({ target }) {
        this.setState({
            day: target.value,
        });
    }

    handleDelete() {
        this.props.deleteEvent(this.state.event_ID, this.state.day);
    }

    render() {
        return (
            <div>
                <div>Admin Calendar</div>
                <TextField fullWidth onChange={this.handleEventIDChange} />
                <TextField fullWidth onChange={this.handleDayChange} />
                <Button
                    variant="contained"
                    onClick={this.handleDelete}
                    disabled={!this.state.event_ID && !this.state.day}
                >
                    Delete Event
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    deleteEvent: (ID, day) => dispatch(deleteEvent(day, ID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCalendar);
