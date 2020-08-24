import React, { useState, useEffect } from "react";
import './TableLayout.scss';
import ReactTable from 'react-table-v6'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange, onCancel, onDelete } from '../../store/appActions';
import _ from 'lodash';
import TableHeaderContent from "./TableHeaderContent";
import ActionComponent from "./ActionComponent";
import SearchBox from "./SearchBox";
import ServerErrorAlert from "../Common/ServerErrorAlert";
import Loader from "../Common/Loader"
import * as apiAction from '../../apiConfig/apis'

const TableLayout = (props) => {
    const { history, state, onChange, onCancel, onDelete } = props;
    const currentState = _.cloneDeep(state);
    const { userList } = currentState;

    const [userTableState, setUserTableState] = useState({
        filteredData: userList,
        searchInput: '',
        usernameSort: false,
        mailIdSort: false,
        mobileNumberSort: false,
        professionSort: false,
        addressSort: false,
        stateSort: false,
        districtSort: false,
        apiError: false,
        loadingStatus: true
    });
    const { filteredData,
        searchInput, usernameSort, mailIdSort, mobileNumberSort,
        professionSort, addressSort, stateSort, districtSort } = userTableState;


    useEffect(() => {
        loadAllUsers();
    }, []);


    const loadAllUsers = async () => {
        const getAllUsersData = await apiAction.getAllUsers();
        if (getAllUsersData.request.status === 201) {
            setUserTableState({ ...userTableState, loadingStatus: false, apiError: false });
            onChange('userList', getAllUsersData.data);
        }
        else {
            setUserTableState({ ...userTableState, loadingStatus: false, apiError: true });
        }
    }



    const handleSortChangeStyle = (props) => {
        if (props[0].id !== '') {
            const sortStyle = { ...userTableState };
            sortStyle[`${props[0].id + 'Sort'}`] = props[0].desc;
            setUserTableState({ ...sortStyle });
        }
    }

    const handleSearchInputchange = (e) => {
        setUserTableState({ ...userTableState, searchInput: e.target.value });
    }

    useEffect(() => {
        searchInput.length ? globalSearchFilter() : setUserTableState({ ...userTableState, filteredData: userList });
    }, [searchInput, state]);


    const globalSearchFilter = () => {
        if (searchInput) {
            let newFilteredData = userList.filter(user => {
                return (
                    user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.mailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.mob.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.userRole.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.address.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.district.toLowerCase().includes(searchInput.toLowerCase()) ||
                    user.state.toLowerCase().includes(searchInput.toLowerCase())
                )
            });


            newFilteredData.length ?
                setUserTableState({ ...userTableState, filteredData: newFilteredData }) : setUserTableState({ ...userTableState, filteredData: [] });

        }
    }

    const columns = [
        {
            Header: <TableHeaderContent columnName='User name' columnSortState={usernameSort} />,
            id: 'name',
            accessor: user => user.name
        },
        {
            Header: <TableHeaderContent columnName='Mail id' columnSortState={mailIdSort} />,
            id: 'mailId',
            accessor: user => user.mailId
        },
        {
            Header: <TableHeaderContent columnName='Mobile no' columnSortState={mobileNumberSort} />,
            id: 'mobileNumber',
            accessor: user => user.mob
        },
        {
            Header: <TableHeaderContent columnName='Profession' columnSortState={professionSort} />,
            id: 'profession',
            accessor: user => user.userRole
        },
        {
            Header: <TableHeaderContent columnName='Address' columnSortState={addressSort} />,
            id: 'address',
            accessor: user => user.address
        },
        {
            Header: <TableHeaderContent columnName='District' columnSortState={districtSort} />,
            id: 'district',
            accessor: user => user.district
        },
        {
            Header: <TableHeaderContent columnName='State' columnSortState={stateSort} />,
            id: 'state',
            accessor: user => user.state
        },
        {
            Header: '',
            accessor: '',
            Cell: ({ value }) => {
                return (
                    <div className='actionsContainer'  >
                        <ActionComponent
                            value={value}
                            userList={userList}
                            onChange={onChange}
                            onDelete={onDelete}
                            userTableState={userTableState}
                            setUserTableState={setUserTableState}
                        />
                    </div>
                )
            },
            width: 100,
            resizable: false
        },
    ];

    return (
        <div>
            {userTableState.loadingStatus ? (<Loader />) : (
                !userTableState.apiError ? (
                    <div className='tableLayoutContainer'>
                        <div className='tableLayoutHeader' >
                            <div className='userListHeader'>
                                <h3>Individual Users</h3>
                                <h3>&nbsp;({userList.length})</h3>
                            </div>
                            <SearchBox
                                handleSearchInputchange={handleSearchInputchange}
                                searchInput={searchInput}
                                history={history}
                                onCancel={onCancel}
                            />
                        </div>
                        {!filteredData.length || !userList.length ? <div><h1>There is no user</h1></div> :
                            <div>
                                <ReactTable
                                    data={filteredData}
                                    columns={columns}
                                    className='-striped -highlight'
                                    minRows={0}
                                    onSortedChange={(props) => handleSortChangeStyle(props)}
                                    showPagination={false}
                                />
                            </div>
                        }
                    </div>
                ) : (
                        <ServerErrorAlert />
                    )
            )
            }
        </div>

    )

}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChange: app_onChange,
        onCancel: onCancel,
        onDelete: onDelete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);