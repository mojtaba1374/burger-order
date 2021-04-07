import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

export class BurgerBuilder extends Component {

    state = {
        purchasing :false
    };

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
        // axios.get('https://react-my-burger-8b47b-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     }).catch(error => {
        //         this.setState({error: true});
        //     });
    }

    
    updatePurchasState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((prev, igval) => prev + igval, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let burger = this.props.error ?
                     <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> 
                     : <Spinner showSpinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                        <OrderSummary
                            ingredients={this.props.ings} 
                            price={this.props.totalPrice}
                            purchaseCanceled={this.purchaseCancelHandler} 
                            purchaseContinued={this.purchaseContinueHandler}
                        />
                    </Modal>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemove}
                        totalPrice={this.props.totalPrice}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBulder.ingredients,
        totalPrice: state.burgerBulder.totalPrice,
        error: state.burgerBulder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreator.addIngredient(ingName, INGREDIENT_PRICE)),
        onIngredientRemove: (ingName) => dispatch(actionCreator.removeIngredient(ingName, INGREDIENT_PRICE)),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreator.authRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));