import React, { Component } from "react";
import { connect } from "react-redux";
import { DAY_FRI, DAY_SAT, DAY_SUN, deleteEvent } from "../../../redux/actions";
import "./styles.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import GenerateDayEvents from "./GenerateEvents";
const dayText = {
    [DAY_FRI]: "Day One: April 30th",
    [DAY_SAT]: "Day Two: April 1st",
    [DAY_SUN]: "Day Three: April 2nd",
};

export const EVENT_TYPE_WORKSHOP = "Workshop";
export const EVENT_TYPE_CEREMONY = "Ceremony";
export const EVENT_TYPE_MEAL_TIME = "Meal Time";
export const EVENT_TYPE_NETWORKING_EVENTS = "Networking Events";
export const EVENT_TYPE_OPEN_NETOWRKING = "Open Networking";
export const EVENT_TYPE_SPONSOR_OPEN_HOUSE = "Sponsor Open House";
export const EVENT_TYPE_GAMES = "Games";

const EVENT_COLOURS = {
    [EVENT_TYPE_WORKSHOP]: "#FFFF00",
    [EVENT_TYPE_CEREMONY]: "#00FF00",
    [EVENT_TYPE_MEAL_TIME]: "#CC4125",
    [EVENT_TYPE_NETWORKING_EVENTS]: "#118AB2",
    [EVENT_TYPE_OPEN_NETOWRKING]: "#8E7CC3",
    [EVENT_TYPE_SPONSOR_OPEN_HOUSE]: "#EF476F",
    [EVENT_TYPE_GAMES]: "#46BDC6",
};
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [DAY_FRI]: [],
            [DAY_SUN]: [],
            [DAY_SAT]: [],
            day_select: DAY_FRI,
        };
    }
    componentDidMount() {
        this.setState({
            [DAY_FRI]: new GenerateDayEvents(
                this.props[DAY_FRI].map((s) => ({
                    ...s,
                    start: s["start"] * 2,
                    end: s["end"] * 2,
                })),
                document.getElementById("day-event-container").clientWidth
            ),
            [DAY_SAT]: new GenerateDayEvents(
                this.props[DAY_SAT].map((s) => ({
                    ...s,
                    start: s["start"] * 2,
                    end: s["end"] * 2,
                })),
                document.getElementById("day-event-container").clientWidth
            ),
            [DAY_SUN]: new GenerateDayEvents(
                this.props[DAY_SUN].map((s) => ({
                    ...s,
                    start: s["start"] * 2,
                    end: s["end"] * 2,
                })),
                document.getElementById("day-event-container").clientWidth
            ),
            day_select: localStorage.getItem("curDay") || DAY_FRI,
        });
    }
    setDay = (d) => {
        localStorage.setItem("curDay", d);
        this.setState({ day_select: d });
    };
    render() {
        let { start, end, step, admin } = this.props;
        step = step || 120;
        // ============= Start time ==========================
        const NOW = new Date();
        const date = NOW.getDate();
        const month = NOW.getMonth();
        let START_TIME = step * 0;
        if (date === 30 && month === 4 && this.state.day_select === DAY_FRI) {
            START_TIME = step * (NOW.getHours() - 1);
        } else if (
            date === 1 &&
            month === 5 &&
            this.state.day_select === DAY_SAT
        ) {
            START_TIME = step * (NOW.getHours() - 1);
        } else if (
            date === 2 &&
            month === 5 &&
            this.state.day_select === DAY_SUN
        ) {
            START_TIME = step * (NOW.getHours() - 1);
        }
        // ===========================================================
        start = start || START_TIME;
        end = end || 720 * 4;
        let times = [...Array(Math.floor((end - start) / step))].map(
            (el, ind) => ind * step + start
        );
        let emptyBlocks = [...Array(Math.floor((end - start) / step))];
        return (
            <div className="cal-con">
                <div onClick={() => this.setDay(DAY_FRI)}>
                    Click for Day One Calendar
                </div>
                <div onClick={() => this.setDay(DAY_SAT)}>
                    Click for Day Two Calendar
                </div>
                <div onClick={() => this.setDay(DAY_SUN)}>
                    Click for Day Three Calendar
                </div>
                <div className="cal-title">
                    {dayText[this.state.day_select]}
                </div>
                <div className="cal-body">
                    <ol className="cal-body__times">
                        {times.map((i) => {
                            let hour = Math.floor(i / step);
                            return (
                                <li style={{ marginBottom: step - 14 }} key={i}>
                                    <span className="hours">
                                        {hour < 10 ? `0${hour}` : hour}:00
                                    </span>
                                    {i < 720 * 2 ? "AM" : "PM"}
                                </li>
                            );
                        })}
                    </ol>
                    <div
                        className="cal-body__events"
                        style={{ height: end - START_TIME }}
                    >
                        <div className="events-bg">
                            {emptyBlocks.map((_, i) => (
                                <div
                                    key={i}
                                    className="events-bg__divider"
                                    style={{ maxHeight: step }}
                                ></div>
                            ))}
                        </div>
                        <div className="events-con" id="day-event-container">
                            {this.state[this.state.day_select]
                                .filter(({ start }) => start >= START_TIME)
                                .map((s) => (
                                    <CalEvent
                                        {...s}
                                        key={s.id}
                                        START_TIME={START_TIME}
                                        admin={admin}
                                        day_select={this.state.day_select}
                                        deleteEvent={this.props.deleteEvent}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEvent: (ID, day) => dispatch(deleteEvent(day, ID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

class CalEvent extends Component {
    deleteEvent = () => {
        const { admin, id, eventTitle, deleteEvent, day_select } = this.props;
        if (
            admin &&
            window.confirm(`Are you sure you want to delete ${eventTitle}`)
        ) {
            deleteEvent(id, day_select);
        }
    };
    render() {
        const {
            top,
            left,
            width,
            height,
            eventTitle = "Title not found",
            eventType,
            eventDescp,
            START_TIME,
            startTimeMin,
            startTimeHour,
            endTimeMin,
            endTimeHour,
            platform,
            platformNotes,
            eventHost,
            admin,
        } = this.props;
        return (
            <div
                className="day-event"
                key={eventTitle}
                style={{
                    top: top - START_TIME,
                    left,
                    width,
                    height,
                    minHeight: height,
                    borderLeftColor: EVENT_COLOURS[eventType],
                }}
            >
                <div className="day-event__row">
                    {admin && (
                        <div
                            className="day-event__delete"
                            onClick={this.deleteEvent}
                        >
                            <DeleteIcon />
                        </div>
                    )}{" "}
                    <div className="day-event__title">{eventTitle}</div>
                    <div className="day-event__date">
                        {startTimeHour < "10" && "0"}
                        {startTimeHour}:{startTimeMin} -{" "}
                        {endTimeHour < "10" && "0"}
                        {endTimeHour}:{endTimeMin}
                    </div>
                </div>
                {eventHost && (
                    <div className="day-event__row">Hosted by: {eventHost}</div>
                )}{" "}
                {eventHost && (
                    <div className="day-event__row">
                        Where: {platform}{" "}
                        {platformNotes && `- ${platformNotes}`}
                    </div>
                )}
                <div className="day-event__descp">{eventDescp}</div>
            </div>
        );
    }
}
