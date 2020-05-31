import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import withErrorHandler from '../../HOC/withErroHandler/withErrorHandler'
import axios from 'axios'


class Checkout extends Component {


  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/Contact-data');
  };

  render() {
    let summary = <Redirect to='/' />  ///if the contents of ingredients are not fully loaded it simply redirect to / page
    if (this.props.ing) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <React.Fragment>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/Contact-data'}
            component={ContactData} />
        </React.Fragment>
      );
    }

    return (
      <div>
        {summary}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}
export default connect(mapStateToProps)(withErrorHandler(Checkout, axios));
