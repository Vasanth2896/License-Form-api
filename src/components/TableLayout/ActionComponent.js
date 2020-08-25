import React, { useState } from 'react';
import { Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import * as apiAction from "../../apiConfig/apis";

const ActionComponent = (props) => {
    const history = useHistory();

    const { value, onDelete, onChange, userTableState,userList, setUserTableState } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = async (value) => {
        setUserTableState({...userTableState,loadingStatus: true})
        setAnchorEl(null);
        const { data } = await apiAction.getUserById(value.id);
        const removeProperty = ({ addressDetails, qualificationDetails, ...rest }) => rest;
        const personalDetails = removeProperty(data);
        const { addressDetails, qualificationDetails } = data
        const user = { personalDetails, addressDetails, qualificationDetails };
        onChange('personalDetails', user.personalDetails);
        onChange('addressDetails', user.addressDetails);
        onChange('qualificationDetails', user.qualificationDetails);
        onChange('editFlag',true);
        onChange('editId',data.id);
        history.push('/layout/PersonalDetails');
    }

    const handleDelete = (value) => {
        onDelete(value);
        setUserTableState({ ...userTableState,filteredData:userList,searchInput: '' });
        setAnchorEl(null);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <FontAwesomeIcon icon={faEllipsisH} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ color: 'blue' }} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleEdit(value)}>Edit user</MenuItem>
                <MenuItem onClick={() => handleDelete(value)}>Delete user</MenuItem>
            </Menu>
        </div>
    );

}

export default ActionComponent;