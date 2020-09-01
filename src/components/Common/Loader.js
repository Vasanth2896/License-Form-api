import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // root: {
    //     position: 'fixed',
    //     width: '100%',
    //     height: '100%',
    //     top: 0,
    //     left: 0,
    //     background: 'transparent'
    // },
    // spinner: {
    //     height: 'inherit',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // }
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.spinner}>
                <CircularProgress
                    size={100}
                />
            </div>
        </div>
    );
}

export default Loader;
