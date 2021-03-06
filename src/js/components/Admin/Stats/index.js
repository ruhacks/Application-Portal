import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { gatherCountStats } from "../../../../redux/actions";
import PropTypes from "prop-types";
import {
    Box,
    CircularProgress,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

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

        if (gettingStatistics || isEmpty(stats) || !getErr) {
            if (gettingStatistics) {
                return <CircularProgress />;
            }
            return (
                <div>
                    <p>
                        {" "}
                        There is currently an error reaching the database.
                        Please wait a few seconds, and then refresh and try
                        again.{" "}
                    </p>
                </div>
            );
        }
        return (
            <Box className="stats-container">
                <Button
                    className="stats-button-refresh"
                    startIcon={<RefreshIcon />}
                    onClick={this.props.gatherCountStats}
                >
                    Update Stats
                </Button>
                <div className="stats-table-header">
                    <h3>Application Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <colgroup>
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "50%" }} />
                        </colgroup>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>😲 TOTAL USERS</TableCell>
                                <TableCell>{stats.userStats.count}</TableCell>
                                <TableCell>{"--"} </TableCell>
                                <TableCell>
                                    Total users registered in system
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    ❌ Applications Incomplete
                                </TableCell>
                                <TableCell>
                                    {stats.userStats.count -
                                        stats.appStats.count}
                                </TableCell>
                                <TableCell>
                                    {(
                                        (stats.userStats.count -
                                            stats.appStats.count) /
                                        stats.userStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                                <TableCell>
                                    Applications have not been submitted.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>✅ Applications Complete</TableCell>
                                <TableCell>{stats.appStats.count}</TableCell>
                                <TableCell>
                                    {(
                                        stats.appStats.count /
                                        stats.userStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                                <TableCell>
                                    Applications have been submitted for review
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>💡 Applications Reviewed</TableCell>
                                <TableCell>
                                    {stats.userStats.countAdmitted +
                                        stats.userStats.countDeclined}
                                </TableCell>
                                <TableCell>
                                    {(
                                        (stats.userStats.countAdmitted +
                                            stats.userStats.countDeclined) /
                                        stats.userStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                                <TableCell>
                                    Applicant either approved or denied
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="stats-table-header">
                    <h3>Admission Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <colgroup>
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "65%" }} />
                        </colgroup>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>😍 Admitted</TableCell>
                                <TableCell>
                                    {stats.userStats.countAdmitted}
                                </TableCell>
                                <TableCell>
                                    {(
                                        stats.userStats.countAdmitted /
                                        stats.appStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>😭 Denied</TableCell>
                                <TableCell>
                                    {stats.userStats.countDeclined}
                                </TableCell>
                                <TableCell>
                                    {(
                                        stats.userStats.countDeclined /
                                        stats.appStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>😑 Waiting Approval</TableCell>
                                <TableCell>
                                    {stats.appStats.count -
                                        stats.userStats.countAdmitted -
                                        stats.userStats.countDeclined}
                                </TableCell>
                                <TableCell>
                                    {(
                                        (stats.appStats.count -
                                            stats.userStats.countAdmitted -
                                            stats.userStats.countDeclined) /
                                        stats.appStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>🎉 Confirmed Admission</TableCell>
                                <TableCell>
                                    {stats.userStats.countConfirmed}
                                </TableCell>
                                <TableCell>
                                    {(
                                        stats.userStats.countConfirmed /
                                        stats.userStats.countAdmitted
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="stats-table-header">
                    <h3>Discord Statistics</h3>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <colgroup>
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "50%" }} />
                        </colgroup>
                        <TableHead>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Percentage of Total</TableCell>
                            <TableCell>Additional Info</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    🗺 Discord Accounts Confirmed
                                </TableCell>
                                <TableCell>{stats.confStats.count}</TableCell>
                                <TableCell>
                                    {(
                                        stats.confStats.count /
                                        stats.appStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                                <TableCell>--</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    🍾 Confirmed Users in Server
                                </TableCell>
                                <TableCell>
                                    {stats.userStats.countCheckedIn}
                                </TableCell>
                                <TableCell>
                                    {(
                                        stats.userStats.countCheckedIn /
                                        stats.appStats.count
                                    ).toFixed(2) *
                                        100 +
                                        "%"}{" "}
                                </TableCell>
                                <TableCell>--</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
