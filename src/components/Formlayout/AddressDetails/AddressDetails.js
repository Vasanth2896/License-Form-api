import React, { useEffect, useState } from 'react';
import { Paper, Grid, Box, Checkbox } from "@material-ui/core";
import _ from 'lodash'
import InputSelect from "../../Common/InputSelect";
import InputText from '../../Common/InputText';
import { AddressDetailsStyles } from '../../Common/commonStyles'
import * as apiAction from '../../../apiConfig/apis'


const AddressDetails = (props) => {
    const classes = AddressDetailsStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { addressDetails } = currentState;
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    const handleChange = (key, value) => {
        addressDetails[key] = value;
        onChange('addressDetails', addressDetails);
    }

    useEffect(()=>{
        if(addressDetails.stateId !==null){
            getDistrictData(addressDetails.stateId)
        }
    },[addressDetails.stateId])

    useEffect(() => {
        getStateData();
    }, []);

    const getStateData = async () => {
        const { data } = await apiAction.getStates();
        setStates(data);
    }

    const getDistrictData = async (id) => {
        const { data } = await apiAction.getDistricts(id);
        setDistricts(data);
    }

    return (
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
                            menuOptions={states}
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
                                    if (e.target.checked) {
                                        handleChange('type', 2);
                                    }
                                    else {
                                        handleChange('type', 1);
                                    }
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
    )
}

export default AddressDetails;