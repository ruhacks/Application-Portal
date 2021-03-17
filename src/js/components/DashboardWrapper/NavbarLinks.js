import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminTabs from "./AdminTabs";
import HackerTabs from "./HackerTabs";
export class NavbarLinks extends Component {
    render() {
        const { admin } = this.props;
        let categories = admin ? AdminTabs : HackerTabs;
        return (
            <div className={`dbnl ${admin && "admin"}`}>
                {categories.map(({ title, links }) => (
                    <Category admin={admin} title={title} links={links} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLinks);

class Category extends Component {
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
                    <i
                        class={`fas fa-chevron-down ${
                            this.state.collapsed ? "collapsed" : ""
                        }`}
                    ></i>
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
