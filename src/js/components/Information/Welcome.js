import React, { Component } from "react";

const paragraphs = [
    {
        q: <span>What is RU Hacks?</span>,
        a: (
            <span>
                <p>
                    {" "}
                    RU Hacks is a unique hackathon at Ryerson University.
                    Hackers meet new people, learn new skills and have fun while
                    showcasing their talents over the course of 48 hours of
                    creativity and innovation.
                </p>
            </span>
        ),
    },
    {
        q: <span>How does a virtual hackathon work?</span>,
        a: (
            <span>
                <p>
                    For those of you who may not know; a hackathon is an event
                    where programmers in teams collaborate on a project to solve
                    a problem. As was done for the previous year, this
                    year&apos;s hackathon will be completely virtual. We will
                    run the opening and closing ceremonies, events, workshops
                    and activities over a livestream. We will be using Hopin for
                    the livestream, Devpost for project submission and Discord
                    to allow for easy communication with hackers, organizers,
                    mentors and more. Head over to the Hacker Guide for more
                    information on how the server has been organized and how you
                    can interact with everyone involved in the event!
                </p>
                <p>
                    If you’re new, no need to worry at all! We know this is a
                    new experience for many of you! This will be an absolutely
                    amazing weekend and we’re happy you’re here! 😊
                </p>
            </span>
        ),
    },
    {
        q: <span>How will we make sure that hackers feel engaged?</span>,
        a: (
            <span>
                <p>
                    We will have a livestream of fun activities, workshops,
                    giveaways, opening and closing ceremonies. Hackers will have
                    the opportunity to participate in events like our “Resume
                    Roast” and have opportunities to network too!
                </p>
            </span>
        ),
    },
    {
        q: <span>How to Prepare for the Event</span>,
        a: (
            <span>
                <ul>
                    <li>
                        Ensure you register for a Devpost account to be able to
                        submit your project and form your team:
                        https://ru-hacks-2021.devpost.com/?ref_feature=challenge&ref_medium=discover
                    </li>
                    <li>
                        Join us on Hopin: By now, you will have received your
                        ticket to access the event through Hopin. So, be sure to
                        register so you can access the event.
                    </li>
                    <li>
                        Stay up to date will all events, workshops and
                        activities from the RU Hacks schedule through the Hacker
                        Portal or check the #announcements page on Discord for
                        current events.
                    </li>
                </ul>
            </span>
        ),
    },
    {
        q: <span>Will there be events and games?</span>,
        a: (
            <span>
                <p>
                    There will be many fun events, games, activities and
                    workshops throughout the event. Head over to the schedule
                    linked above to find out what is happening and when!
                </p>
            </span>
        ),
    },
];
export default class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>
                    We are so happy to have you at the event. Please check
                    through this information guide to learn more about the
                    event, and feel free to message us in the Help Desk channel
                    on Discord if you have any additional questions.
                </p>
                <h2>General Information</h2>
            </div>
        );
    }
}
