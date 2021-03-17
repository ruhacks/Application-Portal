import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
export class NavbarLinks extends Component {
    render() {
        let categories = [
            {
                title: "General",
                links: [
                    { title: "Home", link: "" },
                    { title: "Schedule", link: "" },
                    { title: "Guide", link: "" },
                    { title: "Rules", link: "" },
                ],
            },
            {
                title: "General",
                links: [
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                ],
            },
            {
                title: "General",
                links: [
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                ],
            },
            {
                title: "General",
                links: [
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                ],
            },
            {
                title: "General",
                links: [
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                    { title: "General Information", link: "" },
                ],
            },
        ];
        return (
            <div className="dbnl">
                {categories.map(({ title, links }) => (
                    <Category title={title} links={links} />
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
        return (
            <div className="dbnl-section">
                <div
                    className="dbnl-title"
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
                            <a className="dbnl-link" href={link}>
                                {title}
                            </a>
                        ) : (
                            <Link className="dbnl-link" to={link}>
                                {title}
                            </Link>
                        )
                    )}
                </div>
            </div>
        );
    }
}
