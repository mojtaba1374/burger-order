import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/spinner';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions/index';
import { Redirect } from 'react-router';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touch: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touch: false
            }
        },
        isSignup: true
    }
    
    componentDidMount () {
        if (!this.props.buildingIngs && this.props.authRedirectPath !== '/') {
            this.props.onAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = (value.trim() !== '') && isValid;
        }

        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touch: true
            }
        };
        this.setState({controls: updatedControls})
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
                          this.state.controls.password.value,
                          this.state.isSignup);
        if (this.props.ings !== null && this.props.isAuthenticated) {
            this.props.history.push('/checkout');
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !this.state.isSignup
            };
        });
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                    changed={event => this.inputChangeHandler(event, elem.id)}
                    invalidMessage={elem.config.elementConfig.placeholder}
                />
            );
        });

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <Spinner showSpinner={this.props.loading} />
                <form onSubmit={this.submitHandler}>
                    <h4>Login Form</h4>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch To {this.state.isSignup ? 'Sign In' : 'Sign Up'}
                </Button>
                {this.props.errorMessage ?
                     <p style={{color: 'red'}}>
                         {this.props.errorMessage}
                     </p> 
                : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingIngs: state.burgerBulder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup)),
        onAuthRedirectPath: () => dispatch(actionCreator.authRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);