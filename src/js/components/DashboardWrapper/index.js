import React, { Component } from "react";
import { connect } from "react-redux";
import EggwardImage from "../../../media/eggwardcomputer.png";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authActions";
import NavbarLinks from "./NavbarLinks";
class DashboardWrapper extends Component {
    static propTypes = {
        user: PropTypes.object,
        logoutUser: PropTypes.func,
        emailVerified: PropTypes.bool,
        profile: PropTypes.shape({
            admitted: PropTypes.bool,
            completedProfile: PropTypes.bool,
            confirmed: PropTypes.bool,
            declined: PropTypes.bool,
            rejected: PropTypes.bool,
        }),
    };
    state = {
        navbarOpen: true,
    };
    renderNavHeader() {
        let { admin } = this.props;
        return (
            <div className="db-sidebar__header ">
                <div className={`dbsbh ${admin && "admin"}`}>
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
        const { user, logoutUser, profile, admin } = this.props;
        const { emailVerified } = user;
        const displayConf = profile && profile.admitted;
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
                    <div className={`dbsbh-h1 ${admin && "admin"}`}>
                        {admin ? (
                            <Link to="/">Admin</Link>
                        ) : (
                            <span>
                                Ha<Link to="/admin">c</Link>ker
                            </span>
                        )}{" "}
                        Dashboard
                    </div>

                    <div className="dblinks">
                        <NavbarLinks admin={admin} />
                    </div>
                    <div className="dbfooter">{this.renderNavbarFooter()}</div>
                </div>
                <div className={`db-content ${admin && "admin"}`}>
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
                        <div
                            className={`db-navbar__logout ${admin && "admin"}`}
                            onClick={logoutUser}
                        >
                            Logout
                        </div>
                    </div>
                    <div className={`db-body ${admin && "admin"}`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
