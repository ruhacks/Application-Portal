import React, { Component } from "react";
import { connect } from "react-redux";

class Event extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Get settings
    }

    render() {
        return <div>Events</div>;
    }
}

function mapStateToProps(state) {
    return {
        /*
            Get appropriate variables
        */
    };
}

function mapDispatchToProps(dispatch) {
    return {
        /*
            Get necessary actions
        */
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
