import React, { useEffect, useState } from 'react';
import { Paper, Grid, Box, Checkbox } from "@material-ui/core";
import _ from 'lodash';
import InputSelect from "../../Common/InputSelect";
import InputText from '../../Common/InputText';
import { AddressDetailsStyles } from '../../Common/commonStyles';
import * as apiAction from '../../../apiConfig/apis';

const AddressDetails = (props) => {
    const classes = AddressDetailsStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { addressDetails, seed, apiError } = currentState;
    const [districts, setDistricts] = useState([]);

    const handleChange = (key, value) => {
        addressDetails[key] = value;
        onChange('addressDetails', addressDetails);
    }

    useEffect(() => {
        if (addressDetails.stateId !== null) {
            getDistrictData(addressDetails.stateId)
        }
    }, [addressDetails.stateId])

    const getDistrictData = async (id) => {
        const { data } = await apiAction.getDistricts(id);
        setDistricts(data);
    }

    const getAddressDetailsSeed = async () => {

        onChange('loadingStatus', true);
        const addressTypeData = await apiAction.getAddressType();
        const stateData = await apiAction.getStates();

        const addressDetailsSeed = [addressTypeData, stateData];
        const addressDetailsSeedValidation = addressDetailsSeed.every(data => data.request.status === 200);



        if (addressDetailsSeedValidation) {
            const seedHolder = {
                ...seed,
                addressType: addressTypeData.data,
                states: stateData.data
            }

            onChange('seed', seedHolder);
            onChange('loadingStatus', false);

        }
        else {
            onChange('loadingStatus', false);
            onChange('apiError', true);
        }


    }

    const apiCall = () => {
        if (!apiError) {
            getAddressDetailsSeed();
        }
    }

    useEffect(apiCall, []);

    useEffect(() => {
        if (!apiError) {
            onChange('loadingStatus', true);
        }
    }, [onChange, apiError])


    return (
        <div>

            <Paper className={classes.AddressDetailsStyles} elevation={2}>
                <div style={{ padding: '25px 40px 40px 40px' }}>
                    <h2>Communication Address</h2>
                    <Grid container spacing={5}>,
                    <Grid item xs={12}>
                            <InputText
                                label='Address'
                                name='address'
                                value={addressDetails.address || ''}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputText
                                label='Country'
                                name='country'
                                value={addressDetails.country || ''}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputSelect
                                labelName='State'
                                labelId='state'
                                name='stateId'
                                handleChange={handleChange}
                                value={addressDetails.stateId || ''}
                                menuOptions={seed.states || []}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputSelect
                                labelName='District'
                                labelId='district'
                                name='districtId'
                                handleChange={handleChange}
                                value={addressDetails.districtId || ''}
                                menuOptions={districts}
                                disabled={addressDetails.stateId === null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputText
                                label='pincode'
                                name='pincode'
                                value={addressDetails.pincode || ''}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    color='primary'
                                    onChange={(e) => {
                                        handleChange('type', seed.addressType[(addressDetails.type + 2) % 2].id);
                                    }
                                    }
                                    checked={addressDetails.type === 2}
                                ></Checkbox>
                                <p>Permanent address is same as communication Address</p>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>

    )
}

export default AddressDetails;