import React from 'react';
import { Button, Dialog, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as appActions from '../../store/appActions'
import { useHistory } from 'react-router-dom';

const ServerErrorAlert = () => {

    const history = useHistory();


    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        history.push('/');
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

// const mapStateToProps = (state) => {
//     return {
//         state: state.appReducer
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         onChange: appActions.app_onChange
//     }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorAlert);

export default ServerErrorAlert;


