import React from 'react';

import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map( ctrl => (
            <BurgerControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
            {props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}
        </button>
    </div>
);

export default buildControls;