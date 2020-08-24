import React from 'react';
import { Button, Dialog, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'


const ServerErrorAlert = () => {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Unable to connect to server please try again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color="primary">
                        ok
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ServerErrorAlert

