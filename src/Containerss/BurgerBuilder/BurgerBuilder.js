import React, { Component } from 'react';
import { connect } from 'react-redux'
import Burger from '../../Components/Burger/Burger';
import BuildControlers from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/Ui/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/Ordersumary';
// import axios from 'axios';
import Loader from '../../Components/Ui/Loader/Loader';
import { addIngredient, removeIngredient, initIngredients } from '../../Store/Actions/BurgerBuilder'
import { purchaseInit } from '../../Store/Actions/Orders'
import { authRedirect } from '../../Store/Actions/Auth'

class BurgerBuilder extends Component {
  state = {
    purchasing: false, //you get a modal if order now is true
  };

  async componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients(); //advanced redux is used for state management
  }

  updatePurchaseState(ingredient) {
    const sum = Object.keys(ingredient) //we are checking if any of the items are added or not,if added only you can proceed further
      .map((ingkey) => {
        return ingredient[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  orderCanseledhandler = () => {
    this.setState({ purchasing: false });
  };
  orderPurchasedHandler = () => {
    if (this.state.isAuth) {
      this.setState({ purchasing: true });
    }
    else { //once you add ingredients and try to purchase burger,if your not authenticated,finishing sign upp it shouldd take you to checkout and not "/"
      this.props.onAuthRedirect("/Checkout")            // we are storing the link addres in redux for future use,so user dont loose his purchase state
      this.props.history.push('/signin')
    }
  };

  orderedhandler = () => {
    this.props.onPurchasedInit();
    this.props.history.push('/Checkout');

  };

  render() {
    const disableIngInfo = { ...this.props.ing }; //if any of the ingredients is 0 disablse the button

    for (let key in disableIngInfo) {
      disableIngInfo[key] = disableIngInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Loader />;
    if (this.props.ing) {
      //react fragment is same as aux component
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ing} />
          <BuildControlers
            ingredientAdded={this.props.onIngrdientAdded}
            ingredientremoved={this.props.onIngrdientRemoved}
            disabled={disableIngInfo}
            price={this.props.pric}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.orderPurchasedHandler}
            isAuth={this.props.isAuth}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary //we are showing spiiner if not completly loaded
          ingredients={this.props.ing}
          orderCanseled={this.orderCanseledhandler}
          orderpurchased={this.orderedhandler}
          totalprice={this.props.pric}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Loader />;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalclosed={this.orderCanseledhandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    pric: state.burgerBuilder.totalPrice,
    isAuth: state.auth.token !== null,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngrdientAdded: (ingname) => dispatch(addIngredient(ingname)),
    onIngrdientRemoved: (ingname) => dispatch(removeIngredient(ingname)),
    onInitIngredients: () => dispatch(initIngredients()),
    onPurchasedInit: () => dispatch(purchaseInit()),
    onAuthRedirect: (path) => dispatch(authRedirect(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
