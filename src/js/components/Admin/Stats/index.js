import React, { Component } from "react";
import { connect } from "react-redux";
import { gatherCountStats } from "../../../../redux/actions";
import PropTypes from "prop-types";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

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
        // const data = JSON.parse(stats)
        if (gettingStatistics || !stats) {
            return <CircularProgress />;
        }

        return ( 
            <div>
                <div class="stats-table-header">
                    <h3>Application Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableHead>
                        <TableBody class="">
                            <TableRow>
                                <TableCell>Total users</TableCell>
                                <TableCell>{ 'value' }</TableCell>
                                <TableCell>{ 'percentage'} </TableCell>
                                <TableCell>Total users registered in system</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div class="stats-table-header">
                    <h3>Admission Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div class="stats-table-header">
                    <h3>Discord Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            //     {JSON.stringify(stats)}
        );
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
