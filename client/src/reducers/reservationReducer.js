import {
    GET_RESERVATIONS_REQUEST,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_FAIL,
    GET_RESERVATION_BY_ID_REQUEST,
    GET_RESERVATION_BY_ID_SUCCESS,
    GET_RESERVATION_BY_ID_FAIL,
    UPDATE_RESERVATION_REQUEST,
    UPDATE_RESERVATION_SUCCESS,
    UPDATE_RESERVATION_FAIL,
    ADD_RESERVATION_REQUEST,
    ADD_RESERVATION_SUCCESS,
    ADD_RESERVATION_FAIL
} from '../constants/reservation'

const initState = {
    loading: false,
    reservations: [],
    reservation: {},
    errorMessage: null,
    updateReservationLoading: false
}

const reservationReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_RESERVATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_RESERVATIONS_SUCCESS:
            return {
                ...state,
                reservations: action.reservations,
                loading: false,
            }
        case GET_RESERVATIONS_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                loading: false
            }
        case GET_RESERVATION_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_RESERVATION_BY_ID_SUCCESS:
            return {
                ...state,
                reservation: action.reservation,
                loading: false,
            }
        case GET_RESERVATION_BY_ID_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                loading: false
            }
        case UPDATE_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_RESERVATION_SUCCESS:
            return {
                ...state,
                reservation: action.reservation,
                loading: false,
            }
        case UPDATE_RESERVATION_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                loading: false
            }
        case ADD_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_RESERVATION_SUCCESS:
            return {
                ...state,
                reservations: [...state.reservations, action.reservation],
                loading: false,
            }
        case ADD_RESERVATION_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                loading: false
            }
        default:
            return state
    }
}

export default reservationReducer;