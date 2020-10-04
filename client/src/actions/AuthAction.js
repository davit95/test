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
import {alertMessage} from '../components/Alert/Alert';

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
                type: SIGN_IN_SUCCESS
            });
            alertMessage(alert, message);
        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: SIGN_IN_FAIL
            });
            alertMessage(alert, message);
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
                type: SIGN_UP_SUCCESS
            });
            alertMessage(alert, message);
        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: SIGN_UP_FAIL,
                message: error.response.data.message
            });
            alertMessage(alert, message);
        }

    }
}

export const signOut = (redirect) => {
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
                type: SIGN_OUT_SUCCESS
            });
            alertMessage(alert, message);
            redirect()
        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: SIGN_OUT_FAIL,
                message: error.response.data.message
            });
            alertMessage(alert, message);
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
