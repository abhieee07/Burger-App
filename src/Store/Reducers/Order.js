const initialState = {
    order: [],
    loading: false,
    purchased: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "PURCHASE_INIT ":
            return {
                ...state,
                purchased: false
            }

        case "PURCHASE_BURGER_START":
            return {
                ...state,
                loading: true
            }

        case "PURCHASE_BUGER_SUCCESS":
            const newOrder = {
                ...action.orrderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.order.concat(newOrder)
            }
        case "PURCHASE_BUGER_fail":
            return {
                ...state,
                loading: false,
            }
        case "FETCH_MYORDERS_START":
            return {
                ...state,
                loading: true
            }
        case "FETCH_MYORDERS_SUCCESS":
            return {
                ...state,
                loading: false,
                order: action.orders
            }
        case "FETCH_MYORDERS_FAIL":
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
};
export default reducer