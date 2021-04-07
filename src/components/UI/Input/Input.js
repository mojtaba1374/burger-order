import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    let invalidMessage = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        invalidMessage = <p className={classes.InvalidMessage}>please enter a valid {props.invalidMessage}</p>;
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                            onChange={props.changed} 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value} />;
            break;
        case 'textarea':
            inputElement = <textarea 
                            onChange={props.changed} 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig}
                            value={props.value} />;
            break;
        case 'select':
            inputElement = (
                <select 
                onChange={props.changed} 
                className={inputClasses.join(' ')} 
                value={props.value}
                >
                    {props.elementConfig.options.map(opt => (
                        <option value={opt.value} key={opt.value}>
                                {opt.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {invalidMessage}
            {inputElement}
        </div>
    );
}

export default input;