import React, { Component } from "react";
import DiscordText from "./DiscordText";
export default class Rules extends Component {
    render() {
        return (
            <div className="guide">
                <h1>Rules and Regulartions</h1>
                <h2>Ettiquette Rules</h2>
                <p>
                    Please follow RU Hacks 2021 rules set below, in addition to
                    the MLH{" "}
                    <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
                        Code of Conduct
                    </a>{" "}
                    and <a href="https://mlh.io/privacy">Privacy Policy</a>.
                    These rules will ensure that a respectful and welcoming
                    environment is maintained while interacting with one
                    another. If you need clarification or have questions about
                    any of the rules, feel free to reach out to us in the{" "}
                    <DiscordText href="https://discord.com/channels/768510911597117501/834135090069504081">
                        help-desk
                    </DiscordText>{" "}
                    channel on Discord! Further, if you see any inappropriate
                    content, please message the{" "}
                    <span
                        className="discord"
                        style={{ backgroundColor: "#52484E", color: "#CE6C67" }}
                    >
                        @RU Hacks Team
                    </span>{" "}
                    or{" "}
                    <span
                        className="discord"
                        style={{ backgroundColor: "#3B4A4E", color: "#287E66" }}
                    >
                        @Moderators
                    </span>{" "}
                    on the server or privately.
                </p>
                <ul>
                    <li>
                        Remember to always{" "}
                        <u>
                            <strong>be respectful</strong>
                        </u>{" "}
                        while communicating on the server.
                    </li>
                    <li>
                        <u>
                            <strong>Racism, Sexism and Harassment</strong>
                        </u>{" "}
                        is not tolerated on this server. We uphold an
                        environment of respect. Do not demoralize another
                        person’s racial status or sexual orientation, with
                        intent outside of context, to cause emotional distress.
                        Verbal harassment is harmful and we ask that you avoid
                        this behavior at all times.
                    </li>
                    <li>
                        Consider the privacy of others when posting pictures and
                        ensure that all those included in the photo have
                        consented to the sharing of it before posting. If
                        consent is not properly obtained, the post will be
                        removed immediately.
                    </li>
                    <li>
                        <u>
                            <strong>Listen to organizers</strong>
                        </u>{" "}
                        and any instructions they may provide.
                    </li>
                    <li>
                        Do not provide help with projects other than ones for
                        your own team. Do not request for help from external
                        resources.
                    </li>
                    <li>
                        <u>
                            <strong>DO NOT send spam</strong>
                        </u>{" "}
                        to any of the channels. Spam includes, but is not
                        limited to, posting random characters, sentences, or
                        images that are constant within a short period of time.
                    </li>
                    <li>No inappropriate profile pictures or names.</li>
                    <li>
                        Respect each channel’s policy, and its purpose/topics,
                        (just try to keep conversations on topic depending on
                        the titled channel)
                    </li>
                    <li>
                        Finally, please remember to be kind when roaming and
                        communicating on our server :)
                    </li>
                </ul>
                <p>
                    Additionally, we follow MLH Contest Rules and abide by the
                    MLH Code of Conduct & MLH Privacy Policy. All rules and
                    regulations can be found here:
                    https://ru-hacks-2021.devpost.com/rules
                </p>
            </div>
        );
    }
}
