import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Modal,
} from "@material-ui/core";
import {
    gatherUsers,
    setUsersToNewStatus,
    setUserToNewStatus,
} from "../../../../redux/actions";
import isEmpty from "lodash/isEmpty";
import { DataGrid } from "@material-ui/data-grid";
import PropTypes from "prop-types";
import "../../../../css/_userTable.scss";
import { fields } from "../../../config/defaultState";
import AppForm from "../../Applications/AppForm";

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

/*

*/
class Event extends Component {
    static propTypes = {
        gatherUsers: PropTypes.func,
        gettingUsers: PropTypes.bool,
        userData: PropTypes.object,
        updatedUIDs: PropTypes.array,
        updatedUID: PropTypes.string,
        setUserToNewStatus: PropTypes.func,
        setUsersToNewStatus: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            userSelected: {},
            openModal: false,
            tableLoad: false,
            multipleSelected: [],
        };

        this.prepareDataForTable = this.prepareDataForTable.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.handleRowClicked = this.handleRowClicked.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleUpdateMultipleUsers = this.handleUpdateMultipleUsers.bind(
            this
        );
        this.handleSelectingCheckbox = this.handleSelectingCheckbox.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (isEmpty(prevProps.userData) && !isEmpty(this.props.userData)) {
            this.setState({ loading: false });
        }
        if (
            this.state.tableLoad &&
            (this.props.updatedUID || this.props.updatedUIDs.length > 0)
        ) {
            this.setState({
                tableLoad: false,
            });
        }
    }

    prepareDataForTable(data) {
        const { users } = data;
        const tableRows = [];
        Object.keys(users).forEach((uid, index) => {
            const { email } = users[uid];
            let fullName = "",
                programName = "",
                schoolName = "",
                year = "";
            if (users[uid].application) {
                const app = users[uid].application;
                fullName = app.name;
                programName = app.program;
                schoolName = app.school;
                year = app.studyLevel;
            }

            const {
                admitted,
                checkedIn,
                completedProfile,
                confirmed,
                declined,
                isAdmin,
                rejected,
            } = users[uid].status;

            tableRows.push({
                id: index,
                Name: fullName,
                "E-mail": email,
                Program: programName,
                School: schoolName,
                Year: year,
                CA: completedProfile,
                A: admitted,
                CO: confirmed,
                inDiscord: checkedIn,
                D: declined,
                Admin: isAdmin,
                R: rejected,
                uid,
            });
        });
        return tableRows;
    }

    getColumns() {
        const GridColumns = [
            {
                field: "Name",
                cellClassName: "name-cell",
                type: "string",
                flex: 1,
            },
            {
                field: "E-mail",
                cellClassName: "email-cell",
                flex: 1,
            },
            {
                field: "Program",
                cellClassName: "program-cell",
                flex: 1,
            },
            {
                field: "School",
                cellClassName: "school-cell",
                flex: 1,
            },
            {
                field: "Year",
                cellClassName: "year-cell",
                flex: 1,
            },
            {
                field: "CA",
                flex: 0.3,
                description: "Completed Application status",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "A",
                flex: 0.25,
                description: "Admitted status",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "CO",
                flex: 0.3,
                description: "Confirmed status",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "inDiscord",
                flex: 0.5,
                description: "User joined discord server",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "D",
                flex: 0.25,
                description: "User declined admittance",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "Admin",
                flex: 0.4,
                description: "User is admin",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
            {
                field: "R",
                flex: 0.25,
                description: "User is rejected",
                cellClassName: (params) =>
                    params.value
                        ? "action-cell-complete"
                        : "action-cell-incomplete",
            },
        ];

        return GridColumns;
    }

    handleRowClicked(rowDat) {
        const { row } = rowDat;
        updatedUIDs;
        this.setState({
            userSelected: selectedUser,
            openModal: true,
        });
    }

    componentDidMount() {
        //Get settings
        if (isEmpty(this.props.userData)) {
            this.props.gatherUsers();
        } else {
            this.setState({ loading: false });
        }
    }

    renderModalBody() {
        return (
            <AppForm
                application={this.state.userSelected.application}
                fields={fields}
            />
        );
    }

    handleModalClose() {
        this.setState({
            openModal: false,
            userSelected: {},
        });
    }

    handleUpdateUser(action) {
        const uid = this.state.userSelected.uid;
        this.props.setUserToNewStatus(uid, action);
        this.setState({
            tableLoad: true,
            openModal: false,
            userSelected: {},
        });
    }

    handleUpdateMultipleUsers(action) {
        const uids = this.state.multipleSelected;
        this.props.setUsersToNewStatus(uids, action);
        this.setState({
            tableLoad: true,
            openModal: false,
            userSelected: {},
            multipleSelected: [],
        });
    }

    handleSelectingCheckbox(action) {
        const selection = this.state.multipleSelected;
        if (action.isSelected) {
            selection.push(action.data.uid);
        } else {
            selection.splice(selection.indexOf(action.data.uid), 1);
        }
        this.setState({ multipleSelected: selection });
    }

    render() {
        const { userData, gettingUsers } = this.props;
        const {
            openModal,
            userSelected,
            tableLoad,
            multipleSelected,
        } = this.state;
        if (this.state.loading || gettingUsers) return <CircularProgress />;
        const rows = this.prepareDataForTable(userData);
        const cols = this.getColumns();
        return (
            <div style={{ height: "100%" }}>
                <div style={{ display: "flex", height: "90%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) => {
                                    this.handleUpdateMultipleUsers("admit");
                                }}
                                disabled={multipleSelected.length === 0}
                            >
                                Admit user(s)
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={(e) => {
                                    this.handleUpdateMultipleUsers("reject");
                                }}
                                disabled={multipleSelected.length === 0}
                            >
                                Reject user(s)
                            </Button>
                        </div>
                        <DataGrid
                            rows={rows}
                            columns={cols}
                            checkboxSelection
                            disableSelectionOnClick={true}
                            onRowClick={this.handleRowClicked}
                            loading={tableLoad}
                            onRowSelected={this.handleSelectingCheckbox}
                        />
                    </div>
                </div>
                {!isEmpty(userSelected) && (
                    <Dialog
                        open={openModal}
                        onClose={this.handleModalClose}
                        scroll="body"
                        maxWidth="md"
                    >
                        <div>
                            <DialogContent>
                                {this.renderModalBody()}
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="primary"
                                    fullWidth
                                    variant="contained"
                                    onClick={(e) => {
                                        this.handleUpdateUser("admit");
                                    }}
                                >
                                    Admit user
                                </Button>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    variant="contained"
                                    onClick={(e) => {
                                        this.handleUpdateUser("reject");
                                    }}
                                >
                                    Reject user
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { typeOfUpdate, updatedUID, updatedUIDs, userData } = state.admin;
    if (updatedUID) {
        typeOfUpdate === "admit"
            ? (userData.users[updatedUID].status.admitted = true)
            : (userData.users[updatedUID].status.rejected = true);
    }
    if (updatedUIDs) {
        updatedUIDs.forEach((uid) => {
            typeOfUpdate === "admit"
                ? (userData.users[uid].admitted = true)
                : (userData.users[uid].rejected = true);
        });
    }
    return {
        userData: state.admin.userData,
        gettingUsers: state.admin.gettingUsers,
        updatedUID,
        updatedUIDs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        gatherUsers: () => {
            dispatch(gatherUsers());
        },
        setUserToNewStatus: (uid, action) => {
            dispatch(setUserToNewStatus(uid, action));
        },
        setUsersToNewStatus: (uids, action) => {
            dispatch(setUsersToNewStatus(uids, action));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
