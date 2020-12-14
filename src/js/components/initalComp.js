import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Initial extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return <div>test</div>;
    }
}

export default Initial;
