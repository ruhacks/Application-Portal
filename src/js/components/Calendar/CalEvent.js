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

export default class CalEvent extends Component {
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
        const EVENT_COLOURS = {
            [EVENT_TYPE_WORKSHOP]: "#ffe268",
            [EVENT_TYPE_CEREMONY]: "#9ede73",
            [EVENT_TYPE_MEAL_TIME]: "#ee99a0",
            [EVENT_TYPE_NETWORKING_EVENTS]: "#46BDC6",
            [EVENT_TYPE_OPEN_NETOWRKING]: "#8E7CC3",
            [EVENT_TYPE_SPONSOR_OPEN_HOUSE]: "#ee99a0",
            [EVENT_TYPE_GAMES]: "#ffab73",
            [EVENT_TYPE_SOCIAL]: "#b8b5ff",
        };
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
                        {endTimeHour}:{endTimeMin == 0 ? "00" : endTimeMin}
                    </div>
                </div>
                {eventHost && (
                    <div className="day-event__row">
                        Hosted by: {eventType} {eventHost}
                    </div>
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
