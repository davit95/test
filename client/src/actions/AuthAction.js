import http from '../http'
import {
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT_FAIL,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL
} from '../constants/auth';

export const signIn = (credentials) => {
    return async (dispatch, getState) => {
        dispatch({
            type: SIGN_IN_REQUEST
        })
        try {
            const response = await http.post('login', {
               ...credentials
            });
            const { token, user, alert, message } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user.id);
            setToken(localStorage.getItem('token'));
            dispatch({
                type: SIGN_IN_SUCCESS,
                alert: alert,
                message: message
            });
        } catch (error) {
            dispatch({
                type: SIGN_IN_FAIL,
                message: error.response.data.message,
                alert: error.response.data.alert
            })
        }

    }
}

export const signUp = (credentials) => {
    return async (dispatch, getState) => {
        dispatch({
            type: SIGN_UP_REQUEST
        })
        try {
            const response = await http.post('register', {
                ...credentials
            });
            const { token, user, alert, message } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user.id);
            setToken(localStorage.getItem('token'));
            dispatch({
                type: SIGN_UP_SUCCESS,
                alert: alert,
                message: message
            });
        } catch (error) {
            dispatch({
                type: SIGN_UP_FAIL,
                message: error.response.data.message
            })
        }

    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: SIGN_OUT_REQUEST
        })
        try {
            const response = await http.post('logout');
            const { message, alert } = response.data;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            dispatch({
                type: SIGN_OUT_SUCCESS,
                alert: alert,
                message: message
            });
        } catch (error) {
            dispatch({
                type: SIGN_OUT_FAIL,
                message: error.response.data.message
            })
        }

    }
}

export const getUser = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: GET_USER_REQUEST
        })
        try {
            const response = await http.get('user');
            const user = response.data;
            dispatch({
                type: GET_USER_SUCCESS,
                user: user,
            });
        } catch (error) {
            dispatch({
                type: GET_USER_FAIL,
                message: error.response.data.message
            })
        }

    }
}

function setToken(token) {
    Object.assign(http.defaults,
        {
            headers:
                {
                    'Authorization': `Bearer ${token}`
                }
        }
    )
}
