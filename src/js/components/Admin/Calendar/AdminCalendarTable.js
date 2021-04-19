import React, { Component } from "react";
import { connect } from "react-redux";

export class AdminCalendarTable extends Component {
    render() {
        return <div>Admin Calendar but in table form</div>;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCalendarTable);
