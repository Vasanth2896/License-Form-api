import React from "react";
import { Button } from "@material-ui/core";
import { footerButtonStyles } from "../../Common/commonStyles";

const ProfessionalDetailFooter = (props) => {

    const { history, handleBack, errorValidation, onSave, setActiveStep, state } = props;
    const { editFlag } = state;
    const classes = footerButtonStyles();

    const handleSave = async () => {
        const isValid = await errorValidation();
        if (isValid) {
            saveAndRender()
        }
        else {
            setActiveStep(0);
            history.push('/layout/PersonalDetails');
        }
    }

    const saveAndRender = async () => {
        const wait = await onSave();
        if (wait) {
            history.push('/');
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