import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = (ings) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ings
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILD
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};

export const addIngredient = (ingName, ingPrice) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
        ingredientsPrice: ingPrice
    };
};

export const removeIngredient = (ingName, ingPrice) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
        ingredientsPrice: ingPrice
    }
}