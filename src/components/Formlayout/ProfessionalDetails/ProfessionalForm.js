import React, { useState, useEffect } from 'react';
import { Paper, Grid } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from '../../Common/InputSelect';
import { professionalDetailsFormStyles } from '../../Common/commonStyles';
import * as apiAction from '../../../apiConfig/apis';

const ProfessionalForm = (props) => {
    const classes = professionalDetailsFormStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { qualificationDetails } = currentState;
    const [professionalLevel, setProfessionalLevel] = useState([]);
    const [salary, setSalary] = useState([]);

    const handleChange = (key, value) => {
        qualificationDetails[key] = value;
        onChange('qualificationDetails', qualificationDetails);
    }

    useEffect(() => {
        getProfessionalLevelData();
        getSalaryData();
    }, []);


    const getProfessionalLevelData = async () => {
        const { data } = await apiAction.getProfessionalLevel();
        setProfessionalLevel(data);
    }

    const getSalaryData = async () => {
        const { data } = await apiAction.getSalaryPerAnnum();
        setSalary(data);
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
                            menuOptions={professionalLevel}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Salary per annum'
                            name='annumSal'
                            handleChange={handleChange}
                            value={qualificationDetails.annumSal || ''}
                            menuOptions={salary}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}

export default ProfessionalForm;

