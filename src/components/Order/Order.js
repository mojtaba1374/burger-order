import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    
    for (let ingredientName in props.ingredients) {
        ingredients.push({
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            });
    }

    const ingredientsOutput = ingredients.map(ing => {
        return (<span 
            key={ing.name} 
            style={{
                display: 'inline-block',
                border: '1px solid #ccc', 
                margin: '0 10px', 
                padding: '5px', 
                textTransform: 'capitalize'
            }}>
                {ing.name} ({ing.amount})
            </span>
            );
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.totalPrice}$</strong></p>
        </div>
    )
}

export default order;