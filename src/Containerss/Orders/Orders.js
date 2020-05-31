import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import Loader from '../../Components/Ui/Loader/Loader';
import { fetchMyOrders } from '../../Store/Actions/Orders'
import { connect } from "react-redux"
import withErrorHandler from '../../HOC/withErroHandler/withErrorHandler'
import axios from 'axios'

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchMyOrders(this.props.token, this.props.userId);
  }
  render() {
    let order = (
      <div>   {/* order.ingredients,the ingreidients field is recived from the redux and from backend ,the state is managed at bottom in redux*/}
        {this.props.order.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          /> //here we are showing all the orders available using the map method
        ))}
      </div>
    );
    if (this.props.loading) {
      order = <Loader />;
    }
    return <div>{order}</div>;
  }
}

const matchStateToProps = (state) => {
  return {
    order: state.order.order,        // as we have used combine reducers we decare global names user too,hence twice order
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userid
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    onFetchMyOrders: (token, userId) => dispatch(fetchMyOrders(token, userId))
  }
}
export default connect(matchStateToProps, matchDispatchToProps)(withErrorHandler(Orders, axios));
