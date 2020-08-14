import React from 'react';
import { Box, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const Gender = (props) => {
    const { personalDetails, classes, handleChange, genderList } = props;

    return (
        <Box className={classes.genderGroupContainer}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" value={personalDetails.genderId || 1} className={classes.genderContainer} row>
                {
                    genderList.map(gender => {
                        if (gender.id !== 3) {
                            return (
                                <FormControlLabel
                                    key={gender.id}
                                    value={gender.id}
                                    control={<Radio color='primary' />}
                                    onChange={(e) => handleChange('genderId', gender.id)}
                                    label={gender.name} />
                            )
                        }
                    }
                    )
                }
            </RadioGroup>
        </Box>
    )
}


export default Gender