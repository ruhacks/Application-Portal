import React, { Component } from "react";
import { connect } from "react-redux";

class AdminCalendar extends Component {
    render() {
        return <div>Admin Calendar</div>;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCalendar);
