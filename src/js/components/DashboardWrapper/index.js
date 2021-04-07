import React, { Component } from "react";
import { connect } from "react-redux";
import EggwardImage from "../../../media/eggwardcomputer.png";
import EggwardGif from "../../../media/eggward_bongo.gif";
import {
    ChevronLeft,
    Clear,
    Facebook,
    Instagram,
    Twitter,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    logoutUser,
    subscribeToUserProfile,
} from "../../../redux/actions/authActions";
import NavbarLinks from "./NavbarLinks";
import { subscribeToHackathonTime } from "../../../redux/actions";
import { CircularProgress } from "@material-ui/core";
import isEmpty from "lodash/isEmpty";
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
        subscribeToUserProfile: PropTypes.func,
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
            gif: false,
            unsubscribeFromProfile: null,
        };

        this.setUnsubscribe = this.setUnsubscribe.bind(this);
        this.setUnsubscribeProfile = this.setUnsubscribeProfile.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
    }

    setUnsubscribe(unsubVar) {
        this.setState({
            unsubHackSettings: unsubVar,
        });
    }

    setUnsubscribeProfile(unsubVar) {
        this.setState({
            unsubscribeFromProfile: unsubVar,
        });
    }

    changeIcon() {
        this.setState({
            gif: !this.state.gif,
        });
    }
    renderNavHeader() {
        const { profile, hackathon } = this.props;
        const admin = profile.isAdmin ? profile.isAdmin : false;
        let daysLeft, dateText;
        const currentDate = new Date();
        if (currentDate.getDay() === 30 && currentDate.getMonth() === 4) {
            daysLeft = "Day One";
        } else if (currentDate.getDay() === 1 && currentDate.getMonth() === 5) {
            daysLeft = "Day Two";
        } else if (currentDate.getDay() === 2 && currentDate.getMonth() === 5) {
            daysLeft = "Final Day!";
        } else if (hackathon && hackathon.Hackathon) {
            const hackTime = hackathon.Hackathon.toDate();
            daysLeft = parseInt((hackTime - currentDate) / (24 * 3600 * 1000));
        }

        const imageSource = this.state.gif ? EggwardImage : EggwardGif;
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
        ];
        dateText = `${days[currentDate.getDay()]}, ${
            months[currentDate.getMonth()]
        } ${currentDate.getUTCDate()}`;

        return (
            <div className="db-sidebar__header ">
                <div className={`dbsbh ${admin && "admin"}`}>
                    <img
                        className="dbsbh-img"
                        src={this.state.gif ? EggwardGif : EggwardImage}
                        onMouseEnter={this.changeIcon}
                        onMouseLeave={this.changeIcon}
                    />
                    <div className="dbsbh-content">
                        <div className="dbsbh-content__ruhacks">RU Hacks</div>
                        <div className="dbsbh-content__date">{dateText}</div>
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
                icon: <Twitter />,
                link: "https://twitter.com/ryersonuhacks",
            },
            {
                name: "fb",
                icon: <Facebook />,
                link: "https://www.instagram.com/ruhacks/?hl=en",
            },
            {
                name: "in",
                icon: <Instagram />,
                link: "https://www.facebook.com/ryersonuhacks",
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
        if (isEmpty(this.props.profile))
            this.props.subscribeToUserProfile(this.setUnsubscribeProfile);
    }

    componentWillUnmount() {
        if (this.state.unsubHackSettings !== null) {
            this.state.unsubHackSettings();
        }
        if (this.state.unsubscribeFromProfile !== null) {
            this.state.unsubscribeFromProfile();
        }
    }

    render() {
        const { user, logoutUser, profile } = this.props;
        const { emailVerified } = user;
        const admin = profile.isAdmin ? profile.isAdmin : false;
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
                        <Clear />
                    </div>
                    {this.renderNavHeader()}
                    <div className={`dbsbh-h1 ${admin && "admin"}`}>
                        {admin ? "Admin" : "Hacker"} Dashboard
                    </div>

                    <div className="dblinks">
                        {emailVerified && (
                            <NavbarLinks
                                admin={admin}
                                profile={profile}
                                emailVerified={emailVerified}
                                closeMobile={() => {
                                    this.setState({ navbarOpen: false });
                                }}
                            />
                        )}
                    </div>
                    <div className="dbfooter">{this.renderNavbarFooter()}</div>
                </div>
                <div className={`db-content ${admin && "admin"}`}>
                    <div className="db-navbar">
                        <div
                            className={`db-navbar__side ${
                                !navbarOpen && "collapsed"
                            }
                            `}
                            onClick={() => {
                                this.setState({
                                    navbarOpen: !navbarOpen,
                                });
                            }}
                        >
                            <ChevronLeft />
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
        subscribeToUserProfile: (setUnsubscribe) => {
            dispatch(subscribeToUserProfile(setUnsubscribe));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);
