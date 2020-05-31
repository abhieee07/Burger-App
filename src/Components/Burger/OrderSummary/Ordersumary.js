import React from 'react';
import Button from '../../Ui/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        {' '}
        {igkey} : {props.ingredients[igkey]}{' '}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p> A delecious buger with the following ingriedients :</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong> Total Price : {props.totalprice}</strong>
      </p>
      <p>Continue to Checkout ??</p>
      <div>
        <Button clicked={props.orderCanseled} btnType={'Danger'}>
          CANCEL{' '}
        </Button>{' '}
        {/*THIS IS THE BUTTON COMPONENT WITH ALL THE CSS APPLIED IN COMPONENTS*/}
        <Button clicked={props.orderpurchased} btnType={'Success'}>
          CONTINUE{' '}
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
