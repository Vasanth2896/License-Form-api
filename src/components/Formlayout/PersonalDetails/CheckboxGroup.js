import React from 'react';
import {
    Box, FormLabel, FormControlLabel, FormControl, FormGroup, Checkbox
} from '@material-ui/core';
import _ from 'lodash';


const CheckboxGroup = (props) => {

    const { formLabel, onChange, personalDetails, knowledgeSeed, formGroupClassName } = props;
    const { knownViaProducts } = personalDetails;

    const handleCheckChange = (id) => {
        const handleProducts = !knownViaProducts.includes(id) ? [...knownViaProducts, id] : knownViaProducts.filter(check => check !== id)
        personalDetails['knownViaProducts'] = handleProducts;

        if (!personalDetails.knownViaProducts.includes(6)) {
            personalDetails['others'] = ''
        }

        onChange('personalDetails', personalDetails)
    }


    return (
        <Box>
            <FormControl fullWidth>
                <FormLabel component="legend">{formLabel}</FormLabel>
                <FormGroup className={formGroupClassName} row>
                    {knowledgeSeed.map(checkboxes => {
                        return (
                            <FormControlLabel
                                control={<Checkbox color='primary' />}
                                checked={knownViaProducts.includes(checkboxes.id)}
                                label={checkboxes.name}
                                key={checkboxes.id}
                                onChange={() => handleCheckChange(checkboxes.id)}
                            ></FormControlLabel>
                        )
                    })}
                </FormGroup>
            </FormControl>
        </Box>
    )

}

export default CheckboxGroup;