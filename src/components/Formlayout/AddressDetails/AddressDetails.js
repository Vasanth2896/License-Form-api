import React, { useEffect, useState } from 'react';
import { Paper, Grid, Box, Checkbox } from "@material-ui/core";
import _ from 'lodash'
// import { IndianStates } from "../../../seed/seed";
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


    const handleChange = (e) => {
        addressDetails[e.target.name] = e.target.value;
        onChange('addressDetails', addressDetails);
    }

    useEffect(() => {
        let mounted = true;
        const getStateData = apiAction.getStates();

        if (mounted) {
            getStateData.then(res => setStates(res.data));
        }
        return () => mounted = false;
    }, []);


    return (
        <Paper className={classes.AddressDetailsStyles} elevation={2}>
            <div style={{ padding: '25px 40px 40px 40px' }}>
                <h2>Communication Address</h2>
                <Grid container spacing={5}>,
                    <Grid item xs={12}>
                        <InputText
                            label='Address'
                            name='communicationAddress'
                            value={addressDetails.communicationAddress || ''}
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
                            name='state'
                            handleChange={handleChange}
                            value={addressDetails.state || ''}
                            menuOptions={states}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {/* <InputSelect
                            labelName='District'
                            labelId='district'
                            name='district'
                            value={addressDetails.district || ''}
                            handleChange={handleChange}

                        /> */}
                        <InputText
                            label='District'
                            name='district'
                            value={addressDetails.district || ''}
                            handleChange={handleChange}
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