import React, { Component } from "react";
import { connect } from "react-redux";
import { gatherCountStats } from "../../../../redux/actions";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

class Stats extends Component {
    static propTypes = {
        gatherCountStats: PropTypes.func,
        gettingStatistics: PropTypes.bool,
        getErr: PropTypes.object,
        stats: PropTypes.object,
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.gatherCountStats();
    }

    render() {
        const { gettingStatistics, getErr, stats } = this.props;
        if (gettingStatistics || !stats) {
            return <CircularProgress />;
        }

        return <div>{JSON.stringify(stats)}</div>;
    }
}

function mapStateToProps(state) {
    return {
        gettingStatistics: state.admin.gettingStatistics,
        stats: state.admin.stats,
        getErr: state.admin.getErr,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        gatherCountStats: () => {
            dispatch(gatherCountStats());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
