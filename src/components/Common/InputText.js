import React from 'react';
import { Box, TextField } from "@material-ui/core";

const InputText = (props) => {
    const { label, name, value, handleChange } = props;
    return (
        <Box>
            <TextField
                fullWidth
                variant='filled'
                label={label}
                value={value}
                onChange={(e) => handleChange(name,e.target.value)}
            />
        </Box>
    )
}

export default InputText;