import React, { Component } from "react";
import { connect } from "react-redux";
import EggwardImage from "../../../media/eggwardcomputer.png";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import NavbarLinks from "./NavbarLinks";
class DashboardWrapper extends Component {
    state = {
        navbarOpen: true,
    };
    renderNavHeader() {
        return (
            <div className="db-sidebar__header ">
                <div className="dbsbh">
                    <img className="dbsbh-img" src={EggwardImage} />
                    <div className="dbsbh-content">
                        <div className="dbsbh-content__ruhacks">RU Hacks</div>
                        <div className="dbsbh-content__date">
                            {String(new Date()).slice(0, 15)}
                        </div>
                        <div className="dbsbh-content__days">
                            7 Days till the Hackathon
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderNavbarFooter() {
        let socials = [
            {
                name: "tw",
                icon: <i class="fab fa-twitter"></i>,
                link: "https://www.facebook.com/ryersonuhacks",
            },
            {
                name: "fb",
                icon: <i class="fab fa-instagram"></i>,
                link: "https://twitter.com/ryersonuhacks",
            },
            {
                name: "in",
                icon: <i class="fab fa-facebook"></i>,
                link: "https://www.instagram.com/ruhacks/?hl=en",
            },
        ];
        return socials.map(({ icon, link }) => <a href={link}>{icon}</a>);
    }
    render() {
        const { navbarOpen } = this.state;

        return (
            <div className="db-con">
                <div className={`db-sidebar ${!navbarOpen && "closed"}`}>
                    <div
                        className="db-sidebar__openmobile"
                        onClick={() => {
                            this.setState({
                                navbarOpen: false,
                            });
                        }}
                    >
                        <i class="fas fa-times"></i>
                    </div>
                    {this.renderNavHeader()}
                    <div className="dbsbh-h1">Hacker Dashboard</div>

                    <div className="dblinks">
                        <NavbarLinks></NavbarLinks>
                    </div>
                    <div className="dbfooter">{this.renderNavbarFooter()}</div>
                </div>
                <div className="db-content">
                    <div className="db-navbar">
                        <div
                            className={`db-navbar__side ${
                                !this.state.navbarOpen && "collapsed"
                            }`}
                            onClick={() => {
                                this.setState({
                                    navbarOpen: !navbarOpen,
                                });
                            }}
                        >
                            <i class="fas fa-chevron-circle-left"></i>
                        </div>
                        <div class={`db-navbar__name`}>Hi Johnny 🐢,</div>
                        <div className={"db-navbar__logout"}>Logout</div>
                    </div>
                    <div className="db-body">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(DashboardWrapper);
