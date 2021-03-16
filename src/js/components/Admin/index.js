import React, { Component } from "react";
import { connect } from "react-redux";

class Admin extends Component {
    render() {
        return <div>Admin page!</div>;
    }
}

export default connect(null, null)(Admin);
