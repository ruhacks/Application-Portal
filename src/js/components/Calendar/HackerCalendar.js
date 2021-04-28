import { Button, CircularProgress, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    DAY_FRI,
    DAY_SAT,
    DAY_SUN,
    deleteEvent,
    getAllCalendarInfo,
} from "../../../redux/actions";
import PropTypes from "prop-types";
import Calendar from ".";
class HackerCalendar extends Component {
    static propTypes = {
        getAllCalendarInfo: PropTypes.func,
        calendarLoaded: PropTypes.bool,
        calendar: PropTypes.object,
    };
    constructor(props) {
        super(props);

        this.state = {
            event_ID: "",
            day: "",
        };
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleEventIDChange = this.handleEventIDChange.bind(this);
    }

    componentDidMount() {
        this.loadCalendar();
    }
    loadCalendar = () => {
        this.props.getAllCalendarInfo();
    };
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

    render() {
        if (!this.props.calendarLoaded) return <CircularProgress />;
        return (
            <div>
                <Calendar {...this.props.calendar} admin={true} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    calendar: state.calendar.calendar,
    calendarLoaded: state.calendar.calendarLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    getAllCalendarInfo: () => dispatch(getAllCalendarInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HackerCalendar);
