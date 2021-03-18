import React, { Component } from "react";
import { connect } from "react-redux";
import EggwardImage from "../../../media/eggwardcomputer.png";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authActions";
import NavbarLinks from "./NavbarLinks";
import { subscribeToHackathonTime } from "../../../redux/actions";
import { CircularProgress } from "@material-ui/core";
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
            isAdmin: PropTypes.bool,
            name: PropTypes.String,
        }),
        subscribeToHackathonTime: PropTypes.func,
        hackathon: PropTypes.shape({
            Hackathon: PropTypes.object,
        }),
        children: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            navbarOpen: true,
            unsubHackSettings: null,
        };

        this.setUnsubscribe = this.setUnsubscribe.bind(this);
    }

    setUnsubscribe(unsubVar) {
        this.setState({
            unsubHackSettings: unsubVar,
        });
    }
    renderNavHeader() {
        const { profile, hackathon } = this.props;
        const admin = profile.isAdmin ? profile.isAdmin : false;

        let daysLeft;
        if (hackathon && hackathon.Hackathon) {
            const hackTime = hackathon.Hackathon.toDate();
            const currentDate = new Date();

            daysLeft = parseInt((hackTime - currentDate) / (24 * 3600 * 1000));
        }
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
                            {daysLeft ? (
                                `${daysLeft} days till the Hackathon`
                            ) : (
                                <CircularProgress size={20} />
                            )}
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
                icon: <i className="fab fa-twitter"></i>,
                link: "https://www.facebook.com/ryersonuhacks",
            },
            {
                name: "fb",
                icon: <i className="fab fa-instagram"></i>,
                link: "https://twitter.com/ryersonuhacks",
            },
            {
                name: "in",
                icon: <i className="fab fa-facebook"></i>,
                link: "https://www.instagram.com/ruhacks/?hl=en",
            },
        ];
        return socials.map(({ icon, link, name }) => (
            <a key={name} href={link}>
                {icon}
            </a>
        ));
    }

    componentDidMount() {
        if (this.state.unsubHackSettings === null)
            this.props.subscribeToHackathonTime(this.setUnsubscribe);
    }

    componentWillUnmount() {
        if (this.state.unsubHackSettings === null) return;
        this.state.unsubHackSettings();
    }

    render() {
        const { user, logoutUser, profile } = this.props;
        const { emailVerified } = user;
        const admin = profile.isAdmin ? profile.isAdmin : false;
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
                        <i className="fas fa-times"></i>
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
                        {emailVerified && <NavbarLinks admin={admin} />}
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
                            <i className="fas fa-chevron-circle-left"></i>
                        </div>
                        {profile.name ? (
                            <div className={`db-navbar__name`}>
                                Hi {profile.name}
                            </div>
                        ) : (
                            <div className={`db-navbar__name`}>
                                Hi 👋, fill out an application so we can get to
                                know you better
                            </div>
                        )}

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
        hackathon: state.hackathon.hackInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
        subscribeToHackathonTime: (setUnsubscribe) => {
            dispatch(subscribeToHackathonTime(setUnsubscribe));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
