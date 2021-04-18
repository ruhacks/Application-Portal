import React, { Component } from "react";
import { connect } from "react-redux";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Select,
    TextField,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import {
    createEvent,
    DAY_FRI,
    DAY_SAT,
    DAY_SUN,
} from "../../../../redux/actions";
import PropTypes from "prop-types";
class CreateEvent extends Component {
    static propTypes = {
        createEvent: PropTypes.func,

        creatingEvent: PropTypes.bool,

        createdEventID: PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.state = {
            startTimeHour: 0,
            startTimeMin: "00",
            endTimeHour: 0,
            endTimeMin: "00",
            eventTitle: "",
            eventDescp: "",
            eventType: "",
            eventHost: "",
            platform: "Discord",
            platformNotes: "",
            day: DAY_FRI,
        };
    }
    onSubmit = (e) => {
        e.preventDefault();
        let STATE = { ...this.state };
        // check for blanks
        // Optional field
        delete STATE["platformNotes"];
        delete STATE["eventHost"];
        for (let key of Object.keys(STATE)) {
            if (this.state[key] === "") {
                alert(`Theres a missing value!:${key}`);
                return;
            }
        }
        if (
            this.state.eventType === "Workshop" &&
            this.state.eventHost === ""
        ) {
            alert("Missing event Host");
            return;
        }
        const {
            endTimeHour,
            endTimeMin,
            startTimeHour,
            startTimeMin,
        } = this.state;
        const endT = endTimeHour * 100 + Number(endTimeMin);
        const startT = startTimeHour * 100 + Number(startTimeMin);
        if (endT <= startT) {
            alert("End time should be after start time");
            return;
        }
        let EVENT_ENTRY = {
            startT,
            endT,
            ...this.state,
        };
        delete EVENT_ENTRY["day"];
        this.props.createEvent(this.state.day, EVENT_ENTRY);
        // console.log(EVENT_ENTRY);
    };
    render() {
        const EVENT_TYPES = [
            "Ceremony",
            "Workshop",
            "Meal Time",
            "Networking Events",
            "Open Networking time",
            "Sponsor Open House",
            "Games",
        ];

        if (this.props.creatingEvent) return <CircularProgress />;

        return (
            <div className="ce-con">
                <h1 className="ce-h1">Create an Event</h1>
                {this.props.createdEventID && (
                    <Typography variant="body1" style={{ color: "green" }}>
                        Event {this.props.createdEventID} successfully created
                    </Typography>
                )}

                <h2 className="ce-h2">Glossary</h2>
                <div className="ce-gloss">
                    <h3 className="ce-h3">Main Events</h3>
                    <ul>
                        <li>Ceremony</li>
                        <li>Workshop</li>
                    </ul>
                    <h3 className="ce-h3">Social Events</h3>
                    <ul>
                        <li>Meal time (Food related social activity)</li>
                        <li>Networking</li>
                        <li>Open Networking</li>
                        <li>Open House</li>
                        <li>Game</li>
                    </ul>
                </div>
                <form className="ce-form">
                    <div className="ce-form__row">
                        <TextField
                            id="eventname"
                            autoComplete="off"
                            label="Event Name"
                            required
                            value={this.state.eventTitle}
                            onChange={(e) =>
                                this.setState({ eventTitle: e.target.value })
                            }
                        />
                    </div>
                    <div className="ce-form__row">
                        <FormControl required>
                            <InputLabel id="start-hour-label">
                                Start Time (Hour)
                            </InputLabel>
                            <Select
                                labelId="start-hour-label"
                                id="start-hour"
                                value={this.state.startTimeHour}
                                onChange={(e) =>
                                    this.setState({
                                        startTimeHour: e.target.value,
                                    })
                                }
                            >
                                {[...Array(Number(24))].map((_, i) => (
                                    <MenuItem value={i} key={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl required>
                            <InputLabel id="start-minute-label">
                                Start Time (Minutes)
                            </InputLabel>
                            <Select
                                labelId="start-minute-label"
                                id="start-minute"
                                required
                                value={this.state.startTimeMin}
                                onChange={(e) =>
                                    this.setState({
                                        startTimeMin: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"00"}>00</MenuItem>
                                <MenuItem value={"30"}>30</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="ce-form__row">
                        <FormControl required>
                            <InputLabel id="start-hour-label">
                                End Time (Hour)
                            </InputLabel>
                            <Select
                                labelId="start-hour-label"
                                id="start-hour"
                                value={this.state.endTimeHour}
                                onChange={(e) =>
                                    this.setState({
                                        endTimeHour: e.target.value,
                                    })
                                }
                            >
                                {[...Array(Number(24))].map((_, i) => (
                                    <MenuItem value={i} key={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl required>
                            <InputLabel id="start-minute-label">
                                End Time (Minutes)
                            </InputLabel>
                            <Select
                                labelId="start-minute-label"
                                id="start-minute"
                                required
                                value={this.state.endTimeMin}
                                onChange={(e) =>
                                    this.setState({
                                        endTimeMin: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"00"}>00</MenuItem>
                                <MenuItem value={"30"}>30</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="ce-form__row">
                        <TextField
                            id="event-descp"
                            autoComplete="off"
                            label="Event Description"
                            multiline
                            required
                            value={this.state.eventDescp}
                            onChange={(e) =>
                                this.setState({ eventDescp: e.target.value })
                            }
                        />
                    </div>
                    <div className="ce-form__row">
                        <FormControl required>
                            <InputLabel id="event-type-label">
                                Event Type
                            </InputLabel>
                            <Select
                                labelId="event-type-label"
                                id="event-type"
                                value={this.state.eventType}
                                onChange={(e) =>
                                    this.setState({
                                        eventType: e.target.value,
                                    })
                                }
                            >
                                {EVENT_TYPES.map((v) => (
                                    <MenuItem value={v} key={v}>
                                        {v}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {this.state.eventType === "Workshop" && (
                        <div className="ce-form__row">
                            <TextField
                                autoComplete="off"
                                id="event-host"
                                label="Host"
                                required
                                value={this.state.eventHost}
                                onChange={(e) =>
                                    this.setState({
                                        eventHost: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="ce-form__row">
                        <FormControl required>
                            <InputLabel id="start-minute-label">
                                Platform
                            </InputLabel>
                            <Select
                                labelId="platform-label"
                                id="platform-minute"
                                required
                                value={this.state.platform}
                                onChange={(e) =>
                                    this.setState({
                                        platform: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"Discord"}>Discord</MenuItem>
                                <MenuItem value={"Hopin"}>Hopin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="eventplatform"
                            autoComplete="off"
                            label="Platform Notes (Optional)"
                            value={this.state.platformNotes}
                            multiline
                            onChange={(e) =>
                                this.setState({ platformNotes: e.target.value })
                            }
                        />
                    </div>
                    <div className="ce-form__row">
                        <FormControl required>
                            <InputLabel id="start-minute-label">
                                Day{" "}
                            </InputLabel>
                            <Select
                                labelId="day-label"
                                id="day-minute"
                                required
                                value={this.state.day}
                                onChange={(e) =>
                                    this.setState({
                                        day: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={DAY_FRI}>
                                    Friday (April 30th)
                                </MenuItem>
                                <MenuItem value={DAY_SAT}>
                                    Saturday (May 1st)
                                </MenuItem>
                                <MenuItem value={DAY_SUN}>
                                    Sunday (May 2nd)
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="ce-form__row">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmit}
                        >
                            Create Event
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    creatingEvent: state.calendar.creatingEvent,
    createEventError: state.calendar.createEventError,
    createdEventID: state.calendar.createdEventID,
});

const mapDispatchToProps = (dispatch) => ({
    createEvent: (d, i) => dispatch(createEvent(d, i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
