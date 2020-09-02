import React from "react";
import { Button } from "@material-ui/core";
import { footerButtonStyles } from "../../Common/commonStyles";

const ProfessionalDetailFooter = (props) => {

    console.log(props);

    const { history, handleBack, errorValidation, onSave, setActiveStep, state, onChange } = props;
    const { editFlag } = state;
    const classes = footerButtonStyles();

    const handleSave = () => {
        const isValid = errorValidation();
        if (isValid) {
            saveData()
        }
        else {
            setActiveStep(0);
            history.push('/layout/PersonalDetails');
        }
    }

    const saveData = async () => {

        // have to ask business doubt to abishek

        const wait = await onSave();
        if (wait.request.status === 200 && !wait.request.response.error) {
            history.push('/');
            onChange('apiError', false);
        }
        else {
            onChange('apiError', true);
        }
    }

    return (
        <div>
            <Button
                variant='contained'
                onClick={() => {
                    handleBack();
                }}
            >previous</Button>
            <Button
                variant='contained'
                onClick={handleSave}
                className={classes.proceed}
            >{editFlag ? 'update' : 'save'}</Button>
        </div>
    )
}

export default ProfessionalDetailFooter;