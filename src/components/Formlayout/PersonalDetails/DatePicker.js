import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Box } from '@material-ui/core';


const DatePicker = (props) => {

    const { personalDetails, onChange } = props;
    const { dateOfBirth } = personalDetails;

    function convertToTimestamp(date) {
        if (date !== null) {
            let dateMomentObject = moment(dateOfBirth, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
            let dateObject = dateMomentObject.toDate(); // convert moment.js object to Date object
            return dateObject;
        } 
        return null;
    }

    return (
        <Box>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} >
                <KeyboardDatePicker
                    clearable
                    label='Date Of birth'
                    value={convertToTimestamp(personalDetails.dateOfBirth)}
                    onChange={(date) => {
                        personalDetails['dateOfBirth'] = moment(date).format('DD/MM/YYYY')
                        onChange('personalDetails', personalDetails);
                    }}
                    format="DD/MM/YYYY"
                    inputVariant='filled'
                    fullWidth
                />
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default DatePicker;