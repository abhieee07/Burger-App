import React, { Component } from 'react'
import Input from '../../Components/Ui/Input/Input'
import Button from '../../Components/Ui/Button/Button'
import classes from './Auth.module.css'
import * as authaction from '../../Store/Actions/Auth'
import { connect } from "react-redux"
import Loader from '../../Components/Ui/Loader/Loader'
import withErrorHandler from '../../HOC/withErroHandler/withErrorHandler'
import axios from '../../axiosAuth'
import { Redirect } from 'react-router-dom'


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    }
    componentDidMount() {
        if (!this.props.burgerBuilding && this.props.isRedirect !== "/") {
            this.props.onSetRedirectPath();
        }
    }

    checkValidity(value, rules) {
        // if (rules) {            added aleternative method,null validation in state,that return false
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        } ///&& is used becuase adding multiple checks ,it always takes the result of the last check,hnce we used the and operator
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            isValid = pattern.test(value) && isValid

        }
        return isValid;
        // }
    }

    inputChangedHandler = (event, formKeys) => {
        const updatedform = {
            ...this.state.controls, //here we need to display the text entered by user,hence need to set the state of value,we duplicate it
        };
        const nestedForm = {
            ...updatedform[formKeys], //the object have nested objects which wont be cloned ,hence we need to clone that too by accesing the key off it
        };
        nestedForm.value = event.target.value;
        nestedForm.valid = this.checkValidity(
            nestedForm.value,
            nestedForm.validation
        );
        nestedForm.touched = true;
        updatedform[formKeys] = nestedForm;
        let formisValid = true;
        for (let key in updatedform) {
            formisValid = updatedform[key].valid && formisValid; //set the vaid field in the dropdwon part manually to true,to avoid bug
        }
        this.setState({ controls: updatedform, formIsValid: formisValid });
    };
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    switchAuthModeHandler = () => {
        this.setState(prevstate => {
            return {
                isSignUp: !prevstate.isSignUp
            }
        });
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key],
            });
        } // here we are getting the form optiosns fro the state,using the for in loop

        let form = formElementArray.map((form) => (
            <Input
                key={form.id}
                elementType={form.config.elementType}
                elementConfig={form.config.elementConfig}
                value={form.config.value}
                shouldValidate={form.config.validation}
                changed={(event) => this.inputChangedHandler(event, form.id)}
                touched={form.config.touched}
                invalid={!form.config.valid} //set to ! because we valid in set state,we want to pass invalid or not,hence opposite
            />));
        if (this.props.loading) {
            form = <Loader />
        }
        let authenticated = null
        if (this.props.isAuth) {       ///here after successful login,the page gets redirected to h0me page
            authenticated = <Redirect to={this.props.isRedirect} />
        }
        return (
            <div className={classes.Auth}>
                {authenticated}
                <form onSubmit={this.submitHandler}>
                    <h3>{this.state.isSignUp ? 'SignUp' : 'Login'}</h3>
                    {form}
                    <Button btnType="Success"> SUBMIT </Button>
                </form>
                <button onClick={this.switchAuthModeHandler} > Switch to {this.state.isSignUp ? 'Login' : 'SignUp'} </button>
            </div>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        isRedirect: state.auth.authRedirect,
        burgerBuilding: state.burgerBuilder.building,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authaction.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(authaction.authRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))