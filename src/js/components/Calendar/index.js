import React, { Component } from "react";
import { connect } from "react-redux";
import { DAY_FRI, DAY_SAT, DAY_SUN, deleteEvent } from "../../../redux/actions";
import "./styles.scss";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import GenerateDayEvents from "./GenerateEvents";
import { Fragment } from "react";
import CalendarCheckbox from "./CalendarCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CalEvent from "./CalEvent";
import PropTypes from "prop-types";
export const EVENT_TYPE_WORKSHOP = "Workshop";
export const EVENT_TYPE_CEREMONY = "Ceremony";
export const EVENT_TYPE_MEAL_TIME = "Meal Time";
export const EVENT_TYPE_NETWORKING_EVENTS = "Networking Events";
export const EVENT_TYPE_OPEN_NETOWRKING = "Open Networking";
export const EVENT_TYPE_SPONSOR_OPEN_HOUSE = "Sponsor Events";
export const EVENT_TYPE_GAMES = "Games";
export const EVENT_TYPE_SOCIAL = "Social Events";
class Calendar extends Component {
    static propTypes = {
        start: PropTypes.number,
        end: PropTypes.number,
        step: PropTypes.number,
        admin: PropTypes.string,
        deleteEvent: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            [DAY_FRI]: [],
            [DAY_SUN]: [],
            [DAY_SAT]: [],
            day_select: DAY_FRI,
            live: true,
            filter: {
                [EVENT_TYPE_CEREMONY]: false,
                [EVENT_TYPE_WORKSHOP]: false,
                [EVENT_TYPE_MEAL_TIME]: false,
                [EVENT_TYPE_NETWORKING_EVENTS]: false,
                [EVENT_TYPE_SOCIAL]: false,
                [EVENT_TYPE_SPONSOR_OPEN_HOUSE]: false,
                [EVENT_TYPE_GAMES]: false,
            },
            offsetTop: 0,
        };
    }
    componentDidMount() {
        let TODAY = DAY_FRI;
        const NOW = new Date();
        const date = NOW.getDate();
        const month = NOW.getMonth();
        if (date === 1 && month === 4) {
            TODAY = DAY_SAT;
        } else if (date === 2 && month === 4) {
            TODAY = DAY_SUN;
        }
        this.setState({
            offsetTop: document.getElementById("cal-header").clientHeight,
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
            day_select: TODAY,
            live: localStorage.getItem("liveEvents") || false,
        });
    }
    setDay = (d) => {
        this.setState({ day_select: d });
    };
    renderTitle() {
        const dayText = {
            [DAY_FRI]: (
                <Fragment>
                    <div
                        className="cal-title__center"
                        style={{ marginLeft: 60 }}
                    >
                        April 30 2021
                    </div>
                    <div
                        className="cal-title__icon"
                        onClick={() => this.setDay(DAY_SAT)}
                    >
                        <DoubleArrowIcon />
                    </div>
                </Fragment>
            ),
            [DAY_SAT]: (
                <Fragment>
                    <div
                        className="cal-title__icon L"
                        onClick={() => this.setDay(DAY_FRI)}
                    >
                        <DoubleArrowIcon />
                    </div>
                    <div className="cal-title__center">May 01 2021</div>
                    <div
                        className="cal-title__icon"
                        onClick={() => this.setDay(DAY_SUN)}
                    >
                        <DoubleArrowIcon />
                    </div>
                </Fragment>
            ),
            [DAY_SUN]: (
                <Fragment>
                    <div
                        className="cal-title__icon L"
                        onClick={() => this.setDay(DAY_SAT)}
                    >
                        <DoubleArrowIcon />
                    </div>
                    <div
                        className="cal-title__center"
                        style={{ marginRight: 60 }}
                    >
                        May 02 2021
                    </div>
                </Fragment>
            ),
        };

        return (
            <div className="cal-title">{dayText[this.state.day_select]}</div>
        );
    }
    renderOptions() {
        const filteroptions = Object.keys(this.state.filter);
        return (
            <div className="cal-body__options">
                <div className="cal-bops">
                    {/* <div className="cal-bops__box">
                        <div className="cal-bops__title">Calendar Options</div>
                        <div className="cal-bops__filters">
                            <div className="cal-bops__checkbox">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.live}
                                            onChange={(e) => {
                                                localStorage.setItem(
                                                    "liveEvents",
                                                    e.target.checked
                                                );
                                                this.setState({
                                                    live: e.target.checked,
                                                });
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label="Hide past events"
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="cal-bops__box">
                        <div className="cal-bops__title">Filter</div>
                        <div className="cal-bops__filters all">
                            {filteroptions.map((id) => (
                                <CalendarCheckbox
                                    key={id}
                                    filter={this.state.filter}
                                    id={id}
                                    refThis={this}
                                >
                                    {id}
                                </CalendarCheckbox>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        let { start, end, step, admin } = this.props;
        step = step || 120;
        // ============= Start time ==========================
        const NOW = new Date();
        const date = NOW.getDate();
        const month = NOW.getMonth();
        let START_TIME = step * 0;
        if (this.state.live) {
            if (
                date === 30 &&
                month === 3 &&
                this.state.day_select === DAY_FRI
            ) {
                START_TIME = step * (NOW.getHours() - 1);
            } else if (
                date === 1 &&
                month === 4 &&
                this.state.day_select === DAY_SAT
            ) {
                START_TIME = step * (NOW.getHours() - 1);
            } else if (
                date === 2 &&
                month === 4 &&
                this.state.day_select === DAY_SUN
            ) {
                START_TIME = step * (NOW.getHours() - 1);
            }
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
                <div className="cal-header" id={"cal-header"}>
                    {this.renderTitle()}
                    <div className="cal-edt">
                        This schedule is written in <strong>EDT</strong>
                    </div>
                    {this.renderOptions()}
                </div>
                <div
                    className="cal-body"
                    style={{ paddingTop: this.state.offsetTop }}
                >
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
                                .filter(({ eventType }) => {
                                    for (var k of Object.keys(
                                        this.state.filter
                                    )) {
                                        if (
                                            k === eventType &&
                                            this.state.filter[k]
                                        ) {
                                            return false;
                                        }
                                    }
                                    return true;
                                })
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
