import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touch: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapset', displayValue: 'Cheapset'}
                    ]
                },
                value: 'fastest',  //if you not trigger onChange method, whenever submit form this field empty serve to server
                validation: {},
                valid: true
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: Number(this.props.totalPrice).toFixed(2),
            orderData: formData,
            userId: this.props.userId
        };
        console.log(this.props.userId);
        this.props.onSubmitOrder(order, this.props.token);
        
        // axios.post('orders.json', order)
        //     .then(response => {
        //         this.setState({showSpinner: false});
        //         this.props.history.push('/');
        //         console.log('your order is submit');
        //     })
        //     .catch(error => {
        //         this.setState({showSpinner: false});
        //     });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = (value.trim() !== '') && isValid;
        }

        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }

        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[elementId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touch = (updatedFormElement.value !== '') ? true : false;
        updatedOrderForm[elementId] = updatedFormElement;

        //Handling overall form validity
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
                validation: this.state.orderForm[key].validation 
            });
        }

        let form = formElementsArray.map(elem => {
            return (
                <Input
                    key={elem.id}
                    elementType={elem.config.elementType} 
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value}
                    invalid={!elem.config.valid}
                    shouldValidate={elem.config.validation}
                    touched={elem.config.touch}
                    invalidMessage={elem.config.elementConfig.placeholder}
                    changed={event => this.inputChangeHandler(event, elem.id)}
                />
            );
        });

        return (
            <Aux>
                <Spinner showSpinner={this.props.loading} />
                <div className={classes.ContactData}>
                    <h4>Enter your Contact data</h4>
                    <form onSubmit={this.orderHandler}>
                        {form}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBulder.ingredients,
        totalPrice: state.burgerBulder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitOrder: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));