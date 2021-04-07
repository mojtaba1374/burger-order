import React, { Component } from 'react';
import classes from './Orders.css';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/spinner';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchingOrdersFromServer(this.props.token, this.props.userId);
        // axios.get('/orders.json')
        // .then(response => {
        //         const fetchedOrders = [];
        //         for (let keyId in response.data) {
        //             fetchedOrders.push({
        //                 ...response.data[keyId],
        //                 id: keyId
        //             });
        //         }
        //         this.setState({orders: fetchedOrders, showSpinner: false});
        //     })
        //     .catch(error => {
        //         this.setState({showSpinner: false});
        //         console.log('error is went');
        //     });
    }

    render () {
        let orders= <Spinner showSpinner={this.props.loading} />;
        if (!this.props.loading) {
            orders = this.props.fetchedOrders.map( order => (
                <div key={order.id} className={classes.Orders}>
                    <Order ingredients={order.ingredients} totalPrice={order.price}/>
                </div>
            ));
        }
        return ( 
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fetchedOrders: state.order.fetchedOrders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchingOrdersFromServer: (token, userId) => dispatch(actionCreators.fetchingOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));