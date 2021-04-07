import * as actionTypes from '../actions/actionTypes';

const totalPrice = 4;

const initialState = {
    ingredients: null,
    totalPrice: totalPrice,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + action.ingredientsPrice[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - action.ingredientsPrice[action.ingredientName],
                building: true
            };
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: totalPrice,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILD:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;