import React from 'react';
import { Paper, Grid, } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from '../../Common/InputSelect';
import InputText from '../../Common/InputText';
import { professionalDetailsFormStyles } from '../../Common/commonStyles';

const StudentForm = (props) => {
    const { state, onChange, districts } = props;
    const currentState = _.cloneDeep(state);
    const { qualificationDetails,seed } = currentState;
    const classes = professionalDetailsFormStyles();
   
    const handleChange = (key, value) => {
        qualificationDetails[key] = value;
        onChange('qualificationDetails', qualificationDetails);
    }

    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputSelect
                            labelName='Current Qualification'
                            name='userQualificationId'
                            handleChange={handleChange}
                            value={qualificationDetails.userQualificationId || ''}
                            menuOptions={seed.qualifcationDetailsSeed || []}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Institution name'
                            name='institutionName'
                            value={qualificationDetails.institutionName || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Studying at'
                            name='studyingAt'
                            value={qualificationDetails.studyingAt || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputText
                            label='Institution Address'
                            name='institutionAddress'
                            value={qualificationDetails.institutionAddress || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Country'
                            name='country'
                            value={qualificationDetails.country || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='State'
                            name='stateId'
                            handleChange={handleChange}
                            value={qualificationDetails.stateId || ''}
                            menuOptions={seed.states || []}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='District'
                            name='districtId'
                            handleChange={handleChange}
                            value={qualificationDetails.districtId || ''}
                            menuOptions={districts}
                            disabled={qualificationDetails.stateId === null}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputText
                            label='Pincode'
                            name='pincode'
                            value={qualificationDetails.pincode || ''}
                            handleChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper >
    )
}

export default StudentForm;
