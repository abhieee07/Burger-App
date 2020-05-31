import axios from 'axios'

export const addIngredient = (ingname) => {
    return {
        type: "ADD_INGRDIENT",
        ingredientName: ingname
    }
}
export const removeIngredient = (ingname) => {
    return {
        type: "REMOVE_INGRDIENT",
        ingredientName: ingname
    }
}

export const SetIngredients = (ing) => {
    return {
        type: "SET_INGREDIENTS",
        ingredients: ing
    }
}


export const initIngredients = () => {
    return async dispatch => {
        await axios.get('https://react-my-burger-a5bda.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(SetIngredients(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}