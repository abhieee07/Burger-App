const initialState = {
    token: null,
    userid: null,
    loading: false,
    authRedirect: "/"
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_REDIRECT":
            return {
                ...state,
                authRedirect: action.path
            }
        case "AUTH_START":
            return {
                ...state,
                loading: true,
            }
        case "AUTH_FAIL":
            return {
                ...state,
                loading: false,
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                loading: false,
                token: action.idToken,
                userid: action.localId,
            }
        case "AUTH_LOGOUT":
            return {
                ...state,
                token: null,
                userid: null
            }
        default:
            return state
    }
}
export default reducer