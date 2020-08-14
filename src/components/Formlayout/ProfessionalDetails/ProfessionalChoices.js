import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const ProfessionalChoices = (props) => {
    const { handleChange, classes, value, userRoles } = props;

    return (
        <RadioGroup value={value} className={classes.professionalRadioButtons} row>
            {
                userRoles.map(role => {
                    return (
                        <FormControlLabel
                            key={role.id}
                            value={role.id}
                            onChange={() => { handleChange('userRoleId', role.id) }}
                            control={<Radio color='primary' />}
                            label={role.name}
                        />
                    )
                })
            }
        </RadioGroup>
    )
}

export default ProfessionalChoices;