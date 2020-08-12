import React from 'react';
import { Box, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

const InputSelect = (props) => {
    const { labelName,name, value, handleChange, menuOptions } = props;
    return (
        <Box >
            <FormControl fullWidth>
                <InputLabel style={{ paddingLeft: 10 }}>{labelName}</InputLabel>
                <Select
                    variant='filled'
                    onChange={(e) => handleChange(name,e.target.value)}
                    value={value}
                >
                    {
                        menuOptions.map(option => {
                            return (
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default InputSelect;