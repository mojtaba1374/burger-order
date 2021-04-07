import React from 'react';
import classes from './spinner.css';

const spinner = (props) => {
    return(
        props.showSpinner 
        ? <div className={classes.Spinner}>Loading...</div> 
        : null
    );
};

export default spinner;