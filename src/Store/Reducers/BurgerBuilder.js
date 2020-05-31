
const initialState = {
    ingredients: null,
    totalPrice: 30,
    building: false,
}

const ingredients_Price = {
    Salad: 5,
    Cheese: 10,
    Meat: 20,
    Bacon: 15,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_INGRDIENT":
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,  //the first spreed opertor does not perform deep clone of nested objects hence we clone nested objects again
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredients_Price[action.ingredientName],
                building: true,

            }
        case "REMOVE_INGRDIENT":
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredients_Price[action.ingredientName],
                building: true,

            }
        case "SET_INGREDIENTS":
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 30,
                building: false

            }
        default:
            return state;
    }


};
export default reducer