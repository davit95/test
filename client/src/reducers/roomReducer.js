import {
    GET_ROOMS_REQUEST,
    GET_ROOMS_REQUEST_SUCCESS,
    GET_ROOMS_REQUEST_FAIL
} from '../constants/room'

const initState = {
    loading: false,
    rooms: [],
    errorMessage: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ROOMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ROOMS_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.rooms,
            }
        case GET_ROOMS_REQUEST_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer;