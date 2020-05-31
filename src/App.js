import React, { Component } from 'react';
import './App.css';
import Layout from './HOC/Layout/Layout';
import BugerBuilder from './Containerss/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containerss/CheckOut/Checkout';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Orders from './Containerss/Orders/Orders';
import Auth from './Containerss/Auth/Auth'
import Logout from './Containerss/Auth/Logout/logout'
import { authCheckState } from './Store/Actions/Auth'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.onCheckForUsers()
  }
  render() {

    return (
      <BrowserRouter>
        <div>
          <Layout />
          <Route path='/Checkout' component={CheckOut} />
          <Route path='/orders' component={Orders} />
          <Route path='/signin' component={Auth} />
          <Route path='/Logout' component={Logout} />
          <Route path='/' exact component={BugerBuilder} />
          <Redirect to='/' />

        </div>
      </BrowserRouter>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    onCheckForUsers: () => dispatch(authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
