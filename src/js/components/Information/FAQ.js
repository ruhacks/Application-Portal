import React, { Component } from "react";

const FAQData = [
    {
        q: <span>Who can attend?</span>,
        a: (
            <span>
                If you are a student enrolled in any high school or post
                secondary institution, you are eligible to apply and attend RU
                Hacks.
            </span>
        ),
    },
    {
        q: <span>When can I sign up for RU Hacks?</span>,
        a: (
            <span>
                RU Hacks 2021 will be fully virtual due to COVID-19, and will
                take place April 30th - May 2nd. Registration is now closed.
            </span>
        ),
    },
    {
        q: <span>How much does it cost to attend?</span>,
        a: <span>Admission to RU Hacks is completely free!</span>,
    },
    {
        q: <span>Do I need prior technical / coding skills to attend?</span>,
        a: (
            <span>
                No, prior coding or technical experience is not necessary. RU
                Hacks is a fun learning experience where we’ll be hosting
                beginner workshops, talks and mentors to guide you through
                projects.
            </span>
        ),
    },
    {
        q: <span>Can I start working on my hack before the event?</span>,
        a: (
            <span>
                o, we do not allow participants to work on pre-existing
                projects. RU Hacks hackers are required to start and complete
                their project during the hackathon. However, you are welcome to
                familiarize yourself with specific tools and technologies
                beforehand!
            </span>
        ),
    },
    {
        q: <span>How does judging work?</span>,
        a: (
            <span>
                Our panel of judges come from a variety of backgrounds and
                fields. More specific judging criteria will be sent to you
                closer to the hackathon. The top projects will get a chance to
                show their recorded demos in front of all of RU Hacks during the
                closing ceremony.
            </span>
        ),
    },
    {
        q: <span>What about hardware Hacks?</span>,
        a: (
            <span>
                You are welcome to create a hardware hack, but we ask that you
                respect COVID-19 restrictions while doing so. More information
                will be released closer to the hackathon.
            </span>
        ),
    },
    {
        q: <span>What is the maximum team size?</span>,
        a: (
            <span>
                A single team can consist of 1 to 4 people. If you are looking
                to find other hackers to compete alongside, we encourage you to
                join our Team Formation session at the start of the hackathon on
                the RU Hacks 2021 Discord!
            </span>
        ),
    },
    {
        q: <span>When will the hackathon start/end?</span>,
        a: (
            <span>
                As of now, the hackathon is slated to begin at 6:30 PM EDT,
                Friday, April 30th. Hacking will begin at 7:00 PM that day, and
                last for 48 hours until 7:00 PM EDT, Sunday, May 2nd. Please do
                try to get some sleep within that period though, I hear
                it&apos;s good for your health.
            </span>
        ),
    },
    {
        q: <span>What platforms are we using?</span>,
        a: (
            <span>
                The primary platforms will be the RU Hacks 2021 Discord server,
                as well as Hopin. We will also be using Kumospace for networking
                events, which is a drop-in, drop-out event platform. Don&apos;t
                worry - no need to set anything up for this one.
            </span>
        ),
    },
    {
        q: <span>Is there a set &apos;theme&apos;?</span>,
        a: (
            <span>
                Nope! There will be category hacks and more specific prizes that
                you will be able to gear your hack towards, but you are
                considered for our grand prizes regardless of what you end up
                building. We are not unveiling too much information regarding
                our categories, sponsored hacks, and prizes in advance to
                discourage hackers from starting ahead of the event.
            </span>
        ),
    },
    {
        q: <span>What can I expect at the event?</span>,
        a: (
            <span>
                Workshops, networking, games, giveaways, and more! And GMs, lots
                of GM&apos;s. My phone is going to hate me by the end of the
                weekend.
                <br></br>We&apos;ll have many technical workshops ranging from
                data analytics to web dev, and even if you are a new hacker
                without much coding experience, there&apos;ll be plenty to learn
                about UX, accessibility, and staying in demand in 2021.
                Additionally, free resources (which you can find in #resources)
                will become available closer to the start of the event.
            </span>
        ),
    },
    {
        q: <span>What shouldn&apos;t I do at the hackathon?</span>,
        a: (
            <span>
                Please stay respectful on the server and be kind to one another.
                If you have questions, message us in{" "}
                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="discord"
                    title="Hold ctrl then click to open this channel"
                    href="https://discord.com/channels/768510911597117501/834135090069504081"
                >
                    # help-desk
                </a>{" "}
                or PM any of the Administrators (which you can find listed on
                the RU Hacks Discord server) for more private inquiries and
                concerns.
            </span>
        ),
    },
];
export default class FAQ extends Component {
    render() {
        return (
            <div className="guide">
                <h1>Frequently Asked Questions</h1>
                {FAQData.map(({ q, a }) => (
                    <div key={q}>
                        <h3>{q}</h3>
                        <p>{a}</p>
                    </div>
                ))}
            </div>
        );
    }
}
