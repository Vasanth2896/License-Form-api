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
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress
                size={100}
            />
        </div>
    );
}

export default Loader;
