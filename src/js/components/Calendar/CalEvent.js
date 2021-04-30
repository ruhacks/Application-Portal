import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    EVENT_TYPE_CEREMONY,
    EVENT_TYPE_GAMES,
    EVENT_TYPE_MEAL_TIME,
    EVENT_TYPE_NETWORKING_EVENTS,
    EVENT_TYPE_OPEN_NETOWRKING,
    EVENT_TYPE_SOCIAL,
    EVENT_TYPE_SPONSOR_OPEN_HOUSE,
    EVENT_TYPE_WORKSHOP,
} from ".";
import PropTypes from "prop-types";
import { DAY_FRI, DAY_SAT, DAY_SUN } from "../../../redux/actions";

export default class CalEvent extends Component {
    static propTypes = {
        top: PropTypes.number,
        left: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        eventTitle: PropTypes.string,
        eventType: PropTypes.string,
        eventDescp: PropTypes.string,
        START_TIME: PropTypes.number,
        startTimeMin: PropTypes.number,
        startTimeHour: PropTypes.number,
        endTimeMin: PropTypes.number,
        endTimeHour: PropTypes.number,
        platform: PropTypes.string,
        platformNotes: PropTypes.string,
        eventHost: PropTypes.string,
        admin: PropTypes.string,

        id: PropTypes.string,
        deleteEvent: PropTypes.func,
        day_select: PropTypes.string,
    };
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
            day_select,
            endTimeMin,
            endTimeHour,
            platform,
            platformNotes,
            eventHost,
            admin,
        } = this.props;
        const EVENT_COLOURS = {
            [EVENT_TYPE_WORKSHOP]: "#ffe268",
            [EVENT_TYPE_CEREMONY]: "#9ede73",
            [EVENT_TYPE_MEAL_TIME]: "#f39189",
            [EVENT_TYPE_NETWORKING_EVENTS]: "#cee6b4",
            [EVENT_TYPE_OPEN_NETOWRKING]: "#8E7CC3",
            [EVENT_TYPE_SPONSOR_OPEN_HOUSE]: "#ffc996",
            [EVENT_TYPE_GAMES]: "#ffab73",
            [EVENT_TYPE_SOCIAL]: "#b8b5ff",
        };
        let evmonth = 5;
        let evday = 2;
        if (day_select == DAY_FRI) {
            evmonth = 4;
            evday = 30;
        } else if (day_select == DAY_SAT) {
            evday = 1;
        }
        function convertToLocalTime(h, m, today) {
            if (today == DAY_FRI) {
                return new Date(
                    `Fri, 30 Apr 2021 ${h < "10" ? "0" : ""}${h}:${
                        m < "10" ? "0" : ""
                    }${m}:00 EDT`
                );
            } else if (today == DAY_SAT) {
                return new Date(
                    `Sat, 1 May 2021 ${h < "10" ? "0" : ""}${h}:${
                        m < "10" ? "0" : ""
                    }${m}:00 EDT`
                );
            }
            return new Date(
                `Sun, 2 May 2021 ${h < "10" ? "0" : ""}${h}:${
                    m < "10" ? "0" : ""
                }${m}:00 EDT`
            );
        }
        const startDate = convertToLocalTime(
            startTimeHour,
            startTimeMin,
            day_select
        );

        const endDate = convertToLocalTime(endTimeHour, endTimeMin, day_select);

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
                    backgroundColor: EVENT_COLOURS[eventType],
                }}
                onClick={() => {
                    alert(
                        `\nEvent: ${eventTitle}\nEvent Type: ${eventType}\nStart: ${startDate.toLocaleString()}\nEnd: ${endDate.toLocaleString()}\n${
                            eventDescp && `\n${eventDescp}`
                        }${
                            eventHost && `\nHosted by: ${eventHost}`
                        }\nPlatform: ${platform} ${
                            platformNotes && `- ${platformNotes}`
                        }`
                    );
                }}
            >
                <div className="day-event__row">
                    {false && (
                        <div
                            className="day-event__delete"
                            onClick={this.deleteEvent}
                        >
                            <DeleteIcon />
                        </div>
                    )}
                    <div className="day-event__title">{eventTitle}</div>
                    <div className="day-event__date">
                        {startTimeHour < "10" && "0"}
                        {startTimeHour}:
                        {startTimeMin == 0 ? "00" : startTimeMin} -{" "}
                        {endTimeHour < "10" && "0"}
                        {endTimeHour == "24" ? "00" : endTimeHour}:
                        {endTimeMin == 0 ? "00" : endTimeMin}
                    </div>
                </div>
                {eventHost && (
                    <div className="day-event__row">Hosted by: {eventHost}</div>
                )}
                {
                    <div className="day-event__row">
                        Where: {platform}{" "}
                        {platformNotes && `- ${platformNotes}`}
                    </div>
                }
                <div className="day-event__row">
                    <div className="day-event__descp">{eventDescp}</div>
                </div>
            </div>
        );
    }
}
