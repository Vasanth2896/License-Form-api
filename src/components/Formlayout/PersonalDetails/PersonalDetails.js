import React, { useEffect } from 'react';
import {
    TextField, Paper, Grid, Box
} from '@material-ui/core';
import _ from 'lodash'
import InputSelect from '../../Common/InputSelect';
import CheckboxGroup from './CheckboxGroup';
import { personalDetailStyles } from "../../Common/commonStyles";
import DatePicker from "./DatePicker";
import LanguageAutoComplete from './LanguageAutoComplete';
import Gender from './Gender'
import * as apiAction from '../../../apiConfig/apis';
import Loader from "../../Common/Loader";


const PersonalDetails = (props) => {
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { personalDetails, personalDetailError, seed, loadingStatus } = currentState;
    const classes = personalDetailStyles();



    const handleChange = (key, value) => {
        personalDetails[key] = value;
        if ((key === 'name' || key === 'mailId') && !value.toString().replace(/\s/g, '').length <= 0) {
            personalDetailError[`${key}HelperText`] = ''
            onChange('personalDetailError', personalDetailError);
            onChange('formIsNotValid', false);
        }
        onChange('personalDetails', personalDetails);
    }


    const getPersonalDetailsSeed = async () => {

        const genderData = await apiAction.getGender();
        const languagesData = await apiAction.getLanguages();
        const knowledgeSeedData = await apiAction.getKnownViaProducts();
        const personalDetailsSeed = [genderData, languagesData, knowledgeSeedData];
        const personalDetailsSeedValidation = personalDetailsSeed.every(data => data.request.status === 200);


        if (personalDetailsSeedValidation) {
            const seedHolder = {
                ...seed,
                gender: genderData.data,
                language: languagesData.data,
                knowledgeSeed: knowledgeSeedData.data,
            }
            onChange('seed', seedHolder);
            onChange('loadingStatus', false);
        }

    }

    const apiCall = () => {
        getPersonalDetailsSeed();
    }
    useEffect(() => {
        onChange('loadingStatus', true);
    }
        , [onChange])

    useEffect(apiCall, [])

    return (
        <div>
            {
                loadingStatus ? (<Loader />) : (
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
                                            error={personalDetailError.nameHelperText.length ? true : false}
                                            helperText={personalDetailError.nameHelperText}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Gender
                                        personalDetails={personalDetails}
                                        genderList={seed.gender || []}
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
                                            error={personalDetailError.mailIdHelperText.length ? true : false}
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
                                        menuOptions={seed.language || []}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    < LanguageAutoComplete
                                        personalDetails={personalDetails}
                                        languages={seed.language || []}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CheckboxGroup
                                        formLabel='How you come to know about the product?'
                                        knowledgeSeed={seed.knowledgeSeed || []}
                                        personalDetails={personalDetails}
                                        onChange={onChange}
                                        formGroupClassName={classes.feedbackCheckboxContainer}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className={personalDetails.knownViaProducts.includes(6) ? classes.showOrder : classes.hideOrder} >
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            label='Other'
                                            value={personalDetails.others || ''}
                                            onChange={(e) => handleChange('others', e.target.value)}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                )
            }
        </div>
        // <Paper style={{ background: '#8080801f', height: 'auto' }} elevation={2}>
        //     <div style={{ padding: '25px 40px 40px 40px' }}>
        //         <Grid container spacing={3}>
        //             <Grid item xs={12} sm={6}>
        //                 <Box>
        //                     <TextField
        //                         fullWidth
        //                         variant='filled'
        //                         label='User name'
        //                         onChange={(e) => handleChange('name', e.target.value)}
        //                         value={personalDetails.name || ''}
        //                         error={personalDetailError.nameHelperText.length ? true : false}
        //                         helperText={personalDetailError.nameHelperText}
        //                         required
        //                     />
        //                 </Box>
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <Gender
        //                     personalDetails={personalDetails}
        //                     genderList={seed.gender || []}
        //                     classes={classes}
        //                     handleChange={handleChange}
        //                 />
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <DatePicker
        //                     personalDetails={personalDetails}
        //                     onChange={onChange}
        //                 />
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <Box>
        //                     <TextField
        //                         fullWidth
        //                         variant='filled'
        //                         label='Age'
        //                         onChange={(e) => handleChange('age', e.target.value)}
        //                         value={personalDetails.age}
        //                     />
        //                 </Box>
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <Box>
        //                     <TextField
        //                         fullWidth
        //                         type='email'
        //                         variant='filled'
        //                         label='Mail id'
        //                         onChange={(e) => handleChange('mailId', e.target.value)}
        //                         value={personalDetails.mailId}
        //                         error={personalDetailError.mailIdHelperText.length ? true : false}
        //                         helperText={personalDetailError.mailIdHelperText}
        //                         required
        //                     />
        //                 </Box>
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <Box>
        //                     <TextField
        //                         fullWidth
        //                         variant='filled'
        //                         label='Mobile no'
        //                         onChange={(e) => handleChange('mobNo', e.target.value)}
        //                         value={personalDetails.mobNo}
        //                     />
        //                 </Box>
        //             </Grid>
        //             <Grid item xs={6}>
        //                 <InputSelect
        //                     labelName='Mother Tongue'
        //                     name='motherTongueId'
        //                     handleChange={handleChange}
        //                     value={personalDetails.motherTongueId || ''}
        //                     menuOptions={seed.language || []}
        //                 />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 < LanguageAutoComplete
        //                     personalDetails={personalDetails}
        //                     languages={seed.language || []}
        //                     handleChange={handleChange}
        //                 />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <CheckboxGroup
        //                     formLabel='How you come to know about the product?'
        //                     knowledgeSeed={seed.knowledgeSeed || []}
        //                     personalDetails={personalDetails}
        //                     onChange={onChange}
        //                     formGroupClassName={classes.feedbackCheckboxContainer}
        //                 />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Box className={personalDetails.knownViaProducts.includes(6) ? classes.showOrder : classes.hideOrder} >
        //                     <TextField
        //                         fullWidth
        //                         variant='filled'
        //                         label='Other'
        //                         value={personalDetails.others || ''}
        //                         onChange={(e) => handleChange('others', e.target.value)}
        //                     />
        //                 </Box>
        //             </Grid>
        //         </Grid>
        //     </div>
        // </Paper>
    )
}




export default PersonalDetails;
