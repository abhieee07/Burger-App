import axios from 'axios';
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: 'PURCHASE_BUGER_SUCCESS',
		orderId: id,
		orrderData: orderData,
	};
};
export const purchaseBurgerFail = (error) => {
	return {
		type: 'PURCHASE_BUGER_fail',
		error: error,
	};
};
export const purchaseBurgerStart = () => {
	return {
		type: 'PURCHASE_BURGER_START',
	};
};

export const purchaseBurger = (token, orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then((response) => {
				// console.log(response.data.name)
				dispatch(purchaseBurgerSuccess(response.data.name, orderData)); //we get the key from response.data.name
			})
			.catch((err) => {
				dispatch(purchaseBurgerFail(err));
			});
	};
};
export const purchaseInit = () => {
	return {
		type: 'PURCHASE_INIT',
	};
};

export const fetchMyOrdersSuccess = (orders) => {
	return {
		type: 'FETCH_MYORDERS_SUCCESS',
		orders: orders,
	};
};

export const fetchMyOrdersStart = () => {
	return {
		type: 'FETCH_MYORDERS_START',
	};
};
export const fetchMyOrdersFail = (err) => {
	return {
		type: 'FETCH_MYORDERS_FAIL',
		error: err,
	};
};

export const fetchMyOrders = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchMyOrdersStart());
		let queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('/orders.json' + queryParams)
			.then((res) => {
				const fetchOrders = [];
				for (let key in res.data) {
					// here every order has a key pair and value of it contains another object of key pair
					fetchOrders.push({
						...res.data[key],
						id: key, //spread operator is used so we could append key inside of fetchdata
					});
				}
				dispatch(fetchMyOrdersSuccess(fetchOrders));
			})
			.catch((err) => {
				dispatch(fetchMyOrdersFail(err));
			});
	};
};
