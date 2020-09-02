import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app_onChange } from '../../store/appActions';


const useStyles = makeStyles((theme) => ({
    // root: {
    //     height: '80vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    root: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    spinner: {
        height: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const Loader = (props) => {
    const { state } = props;
    const { loadingStatus } = state
    const classes = useStyles();
    return (
        <div >
            {
                loadingStatus ? (
                    <div className={classes.root} >
                        <div className={classes.spinner}>
                            <CircularProgress
                                size={100}
                            />
                        </div>
                    </div >
                ) : (null)
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChange: app_onChange
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);


