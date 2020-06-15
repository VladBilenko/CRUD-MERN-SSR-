import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const DatePicker = ({formData, onDateChange}) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Expires at:"
                    format="MM/dd/yyyy"
                    value={formData.expiresAt}
                    onChange={onDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    value={formData.expiresAt}
                    onChange={onDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;