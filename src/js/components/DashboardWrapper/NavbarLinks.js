import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminTabs from "./AdminTabs";
import { generateTabs } from "./HackerTabs";
import PropTypes from "prop-types";
import {
    KeyboardArrowDown,
    KeyboardArrowLeft,
    KeyboardArrowUp,
} from "@material-ui/icons";
export class NavbarLinks extends Component {
    static propTypes = {
        admin: PropTypes.bool,
        profile: PropTypes.object,
        emailVerified: PropTypes.bool,
    };
    render() {
        const { admin, profile, emailVerified } = this.props;
        let categories = admin
            ? AdminTabs
            : generateTabs(profile, emailVerified);
        return (
            <div className={`dbnl ${admin && "admin"}`}>
                {categories.map(({ title, links }) => (
                    <Category
                        key={title}
                        admin={admin}
                        title={title}
                        links={links}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLinks);

class Category extends Component {
    static propTypes = {
        admin: PropTypes.bool,
        title: PropTypes.String,
        links: PropTypes.array,
    };

    state = { collapsed: false };
    render() {
        const { admin } = this.props;
        return (
            <div className="dbnl-section">
                <div
                    className={`dbnl-title ${admin && "admin"}`}
                    onClick={() =>
                        this.setState({ collapsed: !this.state.collapsed })
                    }
                >
                    {this.props.title}
                    {this.state.collapsed && <KeyboardArrowUp />}
                    {!this.state.collapsed && <KeyboardArrowDown />}
                </div>
                <div
                    className={`dbnl-links ${
                        this.state.collapsed ? "collapsed" : ""
                    }`}
                    style={{
                        height: !this.state.collapsed
                            ? this.props.links.length * 54
                            : 0,
                    }}
                >
                    {this.props.links.map(({ title, link, external }) =>
                        external ? (
                            <a
                                className={`dbnl-link ${admin && "admin"}`}
                                href={link}
                            >
                                {title}
                            </a>
                        ) : (
                            <Link
                                className={`dbnl-link ${admin && "admin"}`}
                                to={link}
                            >
                                {title}
                            </Link>
                        )
                    )}
                </div>
            </div>
        );
    }
}
