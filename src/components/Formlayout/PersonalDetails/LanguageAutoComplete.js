import React from 'react';
import { TextField, Box, withStyles } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";

const CustomAutoComplete = withStyles({
    tag: {
        backgroundColor: "#BFB6AA",
        height: 24,
        position: "relative",
        zIndex: 0,
        "& .MuiChip-label": {
            color: "black"
        },
        "&:after": {
            content: '""',
            position: "absolute",
            backgroundColor: "grey",
            zIndex: -1
        }
    }
})(Autocomplete);


const LanguageAutoComplete = (props) => {

    const { personalDetails, languages, handleChange } = props;
    const { preferredLanguageId } = personalDetails;
    let valuesPresent = languages.filter(lang => preferredLanguageId.includes(lang.id));

    return (
        <Box>
            <CustomAutoComplete
                multiple
                id="tags-standard"
                value={valuesPresent}
                options={languages}
                getOptionLabel={languages => languages.name}
                onChange={(e, values) => {
                    handleChange('preferredLanguageId', values.map(item => { return item.id }));
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Preferred languages for the app"
                        margin="normal"
                        fullWidth
                    />
                )}
            />
        </Box>

    )
}


export default LanguageAutoComplete;