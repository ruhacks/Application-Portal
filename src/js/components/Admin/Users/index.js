import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, CircularProgress } from "@material-ui/core";
import { gatherUsers } from "../../../../redux/actions";
import isEmpty from "lodash/isEmpty";
import { DataGrid } from "@material-ui/data-grid";
import PropTypes from "prop-types";

/*
<DataGrid
                rows={rows}
                columns={data.columns}
                pagination
                pageSize={5}
                rowCount={100}
                paginationMode="server"
                onPageChange={handlePageChange}
                loading={loading}
            />
*/
class Event extends Component {
    static propTypes = {
        gatherUsers: PropTypes.func,
        userData: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        //Get settings
        this.props.gatherUsers();
    }

    componentDidUpdate(prevProps) {
        if (isEmpty(prevProps.userData) && !isEmpty(this.props.userData)) {
            this.setState({ loading: false });
        }
    }

    render() {
        const { userData } = this.props;

        if (this.state.loading) return <CircularProgress />;

        return (
            <div>
                <Button onClick={this.props.gatherUsers}>GET USERS</Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.admin.userData,
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
        gatherUsers: () => {
            dispatch(gatherUsers());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
