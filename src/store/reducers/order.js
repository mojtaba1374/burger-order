import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    fetchedOrders: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCHING_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCHING_ORDERS_SUCCESS:
            const fetchedOrders = [];
            for (let id in action.ordersData) {
                fetchedOrders.push({
                    id: id,
                    ...action.ordersData[id]
                });
            }
            return {
                ...state,
                fetchedOrders: fetchedOrders,
                loading: false
            };
        case actionTypes.FETCHING_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;