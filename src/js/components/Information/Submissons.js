import React, { Component } from "react";

export default class Submissons extends Component {
    render() {
        return (
            <div className="guide">
                <h1>Submitting your Hack</h1>
                <p>
                    Check the Devpost rules. You can learn more about the
                    categories and challenges for the event at{" "}
                    <a
                        href="https://ru-hacks-2021.devpost.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="RU Hacks 2021 Devpost"
                    >
                        https://ru-hacks-2021.devpost.com
                    </a>
                </p>
                <p>
                    Project Submission is due at{" "}
                    <strong>7:00 PM EDT May 2nd, 2021.</strong>
                </p>
                <ul>
                    <li>
                        <strong>A Demo Video</strong> (5 minutes max) that
                        showcases your application.
                    </li>
                    <li>
                        A link to your <strong>GitHub</strong> repo (must be
                        public).
                    </li>
                    <li>A complete Devpost description.</li>
                </ul>
            </div>
        );
    }
}
