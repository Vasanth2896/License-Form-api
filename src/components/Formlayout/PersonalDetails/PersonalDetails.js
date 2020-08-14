import React, { useEffect, useState } from 'react';
import {
    TextField, Paper, Grid, Box
} from '@material-ui/core';
import _ from 'lodash'
import InputSelect from '../../Common/InputSelect';
import * as apiAction from '../../../apiConfig/apis';
import CheckboxGroup from './CheckboxGroup';
import { personalDetailStyles } from "../../Common/commonStyles";
import DatePicker from "./DatePicker";
import LanguageAutoComplete from './LanguageAutoComplete';
import Gender from './Gender'

const PersonalDetails = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { personalDetails, personalDetailError } = currentState;
    const classes = personalDetailStyles();
    const [language, setLanguage] = useState([]);
    const [knowledgeSeed, setKnowledgeSeed] = useState([]);
    const [gender, setGender] = useState([]);

    const handleChange = (key, value) => {
        personalDetails[key] = value;
        if ((key === 'name' || key === 'mailId') && !value.toString().replace(/\s/g, '').length <= 0) {
            personalDetailError[`${key}Error`] = false;
            personalDetailError[`${key}HelperText`] = ''
            onChange('personalDetailError', personalDetailError);
        }

        onChange('personalDetails', personalDetails);
    }

    useEffect(() => {
        getLanguageData();
        getKnowledgeSeed();
        getGenderData();
    }, []);

    const getLanguageData = async () => {
        const { data } = await apiAction.getLanguages();
        setLanguage(data);
    }

    const getKnowledgeSeed = async () => {
        const { data } = await apiAction.getKnownViaProducts();
        setKnowledgeSeed(data);
    }

    const getGenderData = async () => {
        const { data } = await apiAction.getGender();
        setGender(data);
    }



    return (
        <Paper style={{ background: '#8080801f', height: 'auto' }} elevation={2}>
            <div style={{ padding: '25px 40px 40px 40px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='User name'
                                onChange={(e) => handleChange('name', e.target.value)}
                                value={personalDetails.name || ''}
                                error={personalDetailError.nameError}
                                helperText={personalDetailError.nameHelperText}
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Gender
                            personalDetails={personalDetails}
                            genderList={gender}
                            classes={classes}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            personalDetails={personalDetails}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Age'
                                onChange={(e) => handleChange('age', e.target.value)}
                                value={personalDetails.age}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                type='email'
                                variant='filled'
                                label='Mail id'
                                onChange={(e) => handleChange('mailId', e.target.value)}
                                value={personalDetails.mailId}
                                error={personalDetailError.mailIdError}
                                helperText={personalDetailError.mailIdHelperText}
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Mobile no'
                                onChange={(e) => handleChange('mobNo', e.target.value)}
                                value={personalDetails.mobNo}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Mother Tongue'
                            name='motherTongueId'
                            handleChange={handleChange}
                            value={personalDetails.motherTongueId || ''}
                            menuOptions={language}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        < LanguageAutoComplete
                            personalDetails={personalDetails}
                            languages={language}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CheckboxGroup
                            formLabel='How you come to know about the product?'
                            knowledgeSeed={knowledgeSeed}
                            personalDetails={personalDetails}
                            onChange={onChange}
                            formGroupClassName={classes.feedbackCheckboxContainer}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={personalDetails.knownViaProducts.includes(6) ? classes.showOrder : classes.hideOrder} >
                            {/* <Box> */}
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Other'
                                value={personalDetails.other || ''}
                                onChange={(e) => handleChange('other', e.target.value)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}


export default PersonalDetails;
