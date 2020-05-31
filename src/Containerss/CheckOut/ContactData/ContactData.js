import React, { Component } from 'react';
import Button from '../../../Components/Ui/Button/Button';
import classes from './ContactData.module.css';
import { connect } from 'react-redux'
import Loader from '../../../Components/Ui/Loader/Loader';
import Input from '../../../Components/Ui/Input/Input';
import { purchaseBurger } from '../../../Store/Actions/Orders'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      locality: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Locality',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      pincode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Pincode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false, //this will display  validation only if user enterd any invalid data,at strt it wont show any
      },

      EmailAddress: {
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
      deleviery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'Fastest', displayValue: 'Fastest' },
            { value: 'Cheapest', displayValue: 'cheapest' },
          ],
        },
        value: 'Fastest',
        validation: {},
        valid: true, //manually set to true,as there is no validation here,to avoid bug
      },
    },
    formIsValid: false, //for overallchecking the form data,if any of the input is invalid the button gets disabled
  };

  orderHandler = async (event) => {
    event.preventDefault();
    const formdata = {};
    for (let formvalue in this.state.orderForm) {
      formdata[formvalue] = this.state.orderForm[formvalue].value;
    }
    const order = {
      ingredients: this.props.ing,
      price: this.props.pric,
      userInputs: formdata,  // for sending data to server
      userId: this.props.userId
    }
    this.props.onBurgerOrder(this.props.token, order)
  };
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
      ...this.state.orderForm, //here we need to display the text entered by user,hence need to set the state of value,we duplicate it
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
    this.setState({ orderForm: updatedform, formIsValid: formisValid });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    } // here we are getting the form optiosns fro the state,using the for in loop

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((form) => (
          <Input
            key={form.id}
            elementType={form.config.elementType}
            elementConfig={form.config.elementConfig}
            value={form.config.value}
            shouldValidate={form.config.validation}
            changed={(event) => this.inputChangedHandler(event, form.id)}
            touched={form.config.touched}
            invalid={!form.config.valid} //set to ! because we valid in set state,we want to pass invalid or not,hence opposite
          />
        ))}
        {/* we can use the onSubmit methos in the from eklement itself */}
        <Button btnType='Success' disabled={!this.state.formIsValid} >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Loader />;
    }
    return (
      <div className={classes.ContactData}>
        <h4 style={{ textTransform: 'capitalize' }}>Enter your contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    pric: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userid
  }
}
const mapDispatcherToProps = (dispatch) => {
  return {
    onBurgerOrder: (token, order) => dispatch(purchaseBurger(token, order))
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(ContactData);
