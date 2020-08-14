import React, { useState, useEffect } from 'react';
import { Grid, Paper } from "@material-ui/core";
import StudentForm from './StudentForm';
import ProfessionalForm from './ProfessionalForm';
import HousewivesForm from './HousewivesForm';
import _ from 'lodash'
import { professionalDetailRadioButtonStyles } from '../../Common/commonStyles'
import AlertBox from './AlertBox';
import ProfessionalChoices from './ProfessionalChoices'
import * as apiAction from '../../../apiConfig/apis';

const ProfessionalDetails = (props) => {

    const classes = professionalDetailRadioButtonStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { qualificationDetails, editableIndex } = currentState;
    const { userRoleId } = qualificationDetails
    const [professionalValue, setProfessionalValue] = useState(userRoleId);
    const [open, setOpen] = useState(false);
    const [editProfessionalValue, setEditProfessionalvalue] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [districts, setDistricts] = useState([]);


    useEffect(() => {
        if (qualificationDetails.stateId !== null) {
            getDistrictData(qualificationDetails.stateId)
        }
    }, [qualificationDetails.stateId])

    useEffect(() => {
        getUserRolesData();
    }, []);


    const getDistrictData = async (id) => {
        const { data } = await apiAction.getDistricts(id);
        setDistricts(data);
    }

    const getUserRolesData = async () => {
        const { data } = await apiAction.getUserRoles();
        setUserRoles(data);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setProfessionalValue(editProfessionalValue);
        onChange('professionalDetailToggle', editProfessionalValue);
        // dataClearance();
        setOpen(false);
    }

    const handleRadioChange = (key, value) => {

        if (editableIndex !== null) {
            handleClickOpen();
            // setEditProfessionalvalue(e.target.value);
        }
        else {
            qualificationDetails[key] = value;
            onChange('qualificationDetails', qualificationDetails);
            dataClearance();
            setProfessionalValue(value);
            setEditProfessionalvalue(null);
        }
    }

    function dataClearance() {
        const emptyQualificationDetails = {
            userRoleId: qualificationDetails.userRoleId,
            userQualificationId: null,
            institutionName: "",
            institutionAddress: "",
            country: "",
            studyingAt: "",
            stateId: null,
            districtId: null,
            pincode: "",
            levelId: null,
            annumSal: null
        };
        onChange('qualificationDetails', emptyQualificationDetails);
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                >
                    <Paper elevation={2} className={classes.professionalRadioButtonContainer}>
                        <ProfessionalChoices
                            handleChange={handleRadioChange}
                            classes={classes}
                            value={professionalValue}
                            userRoles={userRoles}
                        />
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    {professionalValue === 1 && <StudentForm {...props} districts={districts} />}
                    {professionalValue === 2 && <ProfessionalForm  {...props} />}
                    {professionalValue === 3 && <HousewivesForm   {...props} />}
                    <AlertBox open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} handleOk={handleOk} professionalValue={professionalValue} />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfessionalDetails;
