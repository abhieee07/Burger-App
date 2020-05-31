import axios from '../../axiosAuth'
export const authStart = () => {
    return {
        type: 'AUTH_START',
    }
}
export const authSuccess = (token, userid) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token,
        localId: userid
    }
}
export const authFail = (err) => {
    return {
        type: 'AUTH_FAIL',
        error: err,
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('localId')

    return {
        type: "AUTH_LOGOUT",
    }
}

export const checkAuthTimeout = (timeLimit) => {
    return dispatch => {
        setTimeout(() => {           //here each user id has a timelimit of 1 hour onlu,after 1 hr the token wont work,hence we logout after 1 hr
            dispatch(logout())
        }, timeLimit * 1000)     //here settimeout takes value in mili sec,hence we need to convert it to seconds by * 1000
    }
}
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6zqItCqI1tOzYserxoyG2GNJEGqyYMNo";
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6zqItCqI1tOzYserxoyG2GNJEGqyYMNo"
        }
        axios.post(url, authData)
            .then(response => {
                // console.log(response)    
                const expryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)   //calculationg time,in short future exact time
                localStorage.setItem('token', response.data.idToken); // clicking on refresh,you get automatically loggeg out,hence creating a local strage here
                localStorage.setItem("expirationDate", expryDate)   // storing expiration time in local storage too
                localStorage.setItem("localId", response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                // console.log(err)
                dispatch(authFail(err));
            })
    }
}
export const authRedirect = (path) => {
    return {
        type: "AUTH_REDIRECT",
        path: path,
    }
}
export const authCheckState = () => { //we are checking this in app js,if we have a user token or not,if there is a user token,tpp wont log out on refreshing the page
    return dispatch => {
        const localId = localStorage.getItem("localId")
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) //here we get value in seconds ,but in chech auth timeout we multiplied by 1000 to get seconds
            }

        }
    }

}