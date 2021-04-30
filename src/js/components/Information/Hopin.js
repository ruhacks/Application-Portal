import React, { Component } from "react";
import passwordImage from "../../../media/guide/hopin/image3.png";
import ticketImage from "../../../media/guide/hopin/image5.png";
import sidebar from "../../../media/guide/hopin/image1.png";
import EventHeader from "../../../media/guide/hopin/image2.png";
import mainPage from "../../../media/guide/hopin/image4.png";
const JoinEventData = [
    <li key={0}>
        Because RU HACKS 2021 has been set up as a private Hopin event, only
        people with a link and event password may be able to access the event.
    </li>,
    <li key={1}>
        In order to join the event, click{" "}
        <a href="https://hopin.com/events/ru-hacks-2021?code=dSisaZv3SFNj5McKFXFPtfa7F">
            Hopin Invite Link
        </a>
    </li>,
    <li key={2}>
        <span>
            Once you find and click on the event page, you’ll find a page where
            you’ll have to type the event password <strong>eggward2021</strong>{" "}
            to access the hackathon.
        </span>
        <div style={{ textAlign: "center", width: "100%" }}>
            <img src={passwordImage} alt="Hopin Password Prompt" width={400} />
        </div>
    </li>,
    <li key={3}>
        <span>
            After doing this, join the event by clicking on the “Join event”
            button and completing the form. If you are a speaker at the event,
            then the organizers will have likely already given you login
            credentials for the event (if they haven’t, contact them so they can
            provide those details).
        </span>
        <div>
            <img
                src={ticketImage}
                alt="Hopin Ticket Menu"
                style={{ width: "100%", float: "right" }}
            />
        </div>
    </li>,
];
const AttendeeInformation = [
    <li key={1}>
        <div>
            Once the event goes live, click on the link given, and sign in with
            the event password.
        </div>
    </li>,
    <li key={2}>
        This will bring you the “Join event” page where you will press “Join
        event”.
    </li>,
    <li key={6}>Sign in using you the account you’ve previously created.</li>,
    <li key={4}>
        After signing in, you’ll be sent back to the “Join event” page. Click on
        “Enter Event”.
    </li>,
    <li key={5}>
        <div>
            Once joining the event, you’ll be brought to the reception area,
            this is where you’ll be able to find the names and links to the
            event’s various sponsors, an over description of the event, and a{" "}
            <strong>COMPLETE SCHEDULE</strong> of what will happen during this
            event, as well as when and where these will take place.{" "}
        </div>
        <div style={{ textAlign: "center", width: "100%" }}>
            <img src={mainPage} alt="Hopin Main Page" width="100%" />
        </div>
    </li>,
];
const eventLayoutData = [
    <li key={0}>
        <div>
            In the <strong>reception area</strong>, on the right side of the
            screen, you’ll be able to communicate in the public RU HACKS chat,
            access the public polls, see various attendees online and ask
            questions in the Q&A section.
        </div>
        <div style={{ textAlign: "center", width: "100%" }}>
            <img src={EventHeader} alt="Hopin Event Header" width={400} />
        </div>
    </li>,
    <li key={1}>
        Additionally, above the <strong>Event</strong> title, you can access any
        notifications (the bell icon) or direct messages (airplane icon) sent to
        you.
    </li>,
    <li key={2} style={{ height: 450 }}>
        <img
            src={sidebar}
            style={{ float: "left", width: 100, marginRight: "10px" }}
        ></img>{" "}
        On the left hand side of the screen, you’ll be able to access the
        various parts of this event: Stage, Sessions, Networking, and Expo.{" "}
    </li>,
];
export default class Hopin extends Component {
    render() {
        return (
            <div className="guide">
                <h1>Hopin</h1>
                <h2>Joining the Event</h2>
                <ol>{JoinEventData}</ol>
                <h2>Attending the Event</h2>
                <ol>{AttendeeInformation}</ol>
                <h2>Event Layout</h2>
                <ol>{eventLayoutData}</ol>
            </div>
        );
    }
}
