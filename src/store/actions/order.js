import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

// FETCHING ORDERS FOR ORDERS CONTAINER COMPONENT

export const fetchOrdersSuccess = (ordersData, userId) => {
    return {
        type: actionTypes.FETCHING_ORDERS_SUCCESS,
        ordersData: ordersData,
        userId: userId
    };
};

export const fetchingOrdersFail = (error) => {
    return {
        type: actionTypes.FETCHING_ORDERS_FAIL,
        errorFetching: error
    };
};

export const fetchingOrdersStart = () => {
    return {
        type: actionTypes.FETCHING_ORDERS_START
    };
};

export const fetchingOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchingOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(response => {
            console.log(response.data);
            dispatch(fetchOrdersSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchingOrdersFail(error));
        });
    };
};