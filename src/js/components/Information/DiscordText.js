import React, { Component } from "react";
import PropTypes from "prop-types";

export default class DiscordText extends Component {
    static propTypes = {
        href: PropTypes.string,
        children: PropTypes.any,
    };

    render() {
        return (
            <a
                target="_blank"
                rel="noreferrer noopener"
                className="discord"
                title="Hold ctrl then click to open this channel"
                href={this.props.href}
            >
                # {this.props.children}
            </a>
        );
    }
}
