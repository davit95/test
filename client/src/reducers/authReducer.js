import {
    SIGN_IN_FAIL,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
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

const initState = {
    isLoggedIn: false,
    loading: false,
    user: {},
    hasError: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                hasError: true,
                isLoggedIn: false,
                loading: false
            }
        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                loading: false
            }
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: false
            }
        case SIGN_OUT_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user,
                isLoggedIn: true,
            }
        case GET_USER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer;