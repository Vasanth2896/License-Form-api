import React from 'react';
import { Paper, Grid } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from '../../Common/InputSelect';
import { professionalDetailsFormStyles } from '../../Common/commonStyles';

const ProfessionalForm = (props) => {
    const classes = professionalDetailsFormStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { qualificationDetails, seed } = currentState;


    const handleChange = (key, value) => {
        qualificationDetails[key] = value;
        onChange('qualificationDetails', qualificationDetails);
    }

    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Level'
                            name='levelId'
                            handleChange={handleChange}
                            value={qualificationDetails.levelId || ''}
                            menuOptions={seed.professionalLevel || []}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Salary per annum'
                            name='annumSal'
                            handleChange={handleChange}
                            value={qualificationDetails.annumSal || ''}
                            menuOptions={seed.salary || []}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}

export default ProfessionalForm;

