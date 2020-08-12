import React, { useEffect, useState } from 'react';
import { Paper, Grid, } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from '../../Common/InputSelect';
import InputText from '../../Common/InputText';
// import { IndianStates, currentQualificationList } from "../../../seed/seed";
import { professionalDetailsFormStyles } from '../../Common/commonStyles';
import * as apiAction from '../../../apiConfig/apis';

const StudentForm = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { student } = currentState;
    const classes = professionalDetailsFormStyles();
    const [states, setStates] = useState([]);
    const [qualifcationDetails, setQualificationDetails] = useState([]);

    const handleChange = (e) => {
        student[e.target.name] = e.target.value
        onChange('student', student);
    }


    useEffect(() => {
        let mounted = true;
        const getStateData = apiAction.getStates();
        const getQualificationData = apiAction.getQualificationDetails();
        if (mounted) {
            getStateData.then(res => setStates(res.data));
            getQualificationData.then(res => setQualificationDetails(res.data));
        }
        return () => mounted = false;

    }, []);



    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputSelect
                            labelName='Current Qualification'
                            labelId='currentQualification'
                            name='currentQualification'
                            handleChange={handleChange}
                            value={student.currentQualification}
                            // menuOptions={currentQualificationList}
                            menuOptions={qualifcationDetails}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Institution name'
                            name='institutionName'
                            value={student.institutionName || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Studying at'
                            name='studyingAt'
                            value={student.studyingAt || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            label='Institution Address'
                            name='institutionAddress'
                            value={student.institutionAddress || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Country'
                            name='country'
                            value={student.country || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='State'
                            labelId='state'
                            name='state'
                            handleChange={handleChange}
                            value={student.state || ''}
                            menuOptions={states}
                        // menuOptions={IndianStates}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='District'
                            name='district'
                            value={student.district || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Pincode'
                            name='pincode'
                            value={student.pincode || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper >
    )
}

export default StudentForm;
