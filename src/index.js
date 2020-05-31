import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; //COMPOSE is for redux dev tools
import thunk from 'redux-thunk';

import burgerBuilderReducer from './Store/Reducers/BurgerBuilder';
import orderReducer from './Store/Reducers/Order';
import authReducer from './Store/Reducers/Auth';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://react-my-burger-a5bda.firebaseio.com/';

// axios.interceptors.request.use(request => {
//   console.log(request)dir

//   return request;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducers = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
const app = (
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// axios.interceptors.response.use(response => {
//   console.log(response);
//   return response;
//   },error =>{
//     console.log(error);
//     return Promise.reject(error);
//   });
