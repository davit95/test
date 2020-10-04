import http from '../http';
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
} from '../constants/reservation';
import {
    alertMessage
} from '../components/Alert/Alert';

export const getReservations = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: GET_RESERVATIONS_REQUEST
        })
        try {
            const response = await http.get(`reservations`);
            const { reservations } = response.data;
            dispatch({
                type: GET_RESERVATIONS_SUCCESS,
                reservations: reservations
            });

        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: GET_RESERVATIONS_FAIL,
                message: error.response.data.message,
                alert: error.response.data.alert,
            });
            alertMessage(alert, message);
        }
    }
}

export const getReservation = (id, redirect) => {
    return async (dispatch, getState) => {
        dispatch({
            type: GET_RESERVATION_BY_ID_REQUEST
        })
        try {
            const response = await http.get(`reservations/${id}`);
            const { reservation } = response.data;
            dispatch({
                type: GET_RESERVATION_BY_ID_SUCCESS,
                reservation: reservation
            });

        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: GET_RESERVATION_BY_ID_FAIL
            });
            alertMessage(alert, message);
            redirect();
        }

    }
}

export const updateReservation = (data, id, redirect) => {
    return async (dispatch, getState) => {
        dispatch({
            type: UPDATE_RESERVATION_REQUEST
        })
        try {
            const response = await http.put(`reservations/${id}`, {
                ...data
            });
            const { reservation, alert, message } = response.data;
            dispatch({
                type: UPDATE_RESERVATION_SUCCESS,
                reservation: reservation
            });
            alertMessage(alert, message);
            redirect();
        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: UPDATE_RESERVATION_FAIL
            });
            alertMessage(alert, message);
        }

    }
}

export const addReservation = (data, redirect) => {
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_RESERVATION_REQUEST
        })
        try {
            const response = await http.post(`reservations`, {
                ...data
            });
            const { reservation, alert, message } = response.data;
            reservation.key = reservation.id;
            dispatch({
                type: ADD_RESERVATION_SUCCESS,
                reservation: reservation
            });
            alertMessage(alert, message);
            redirect();
        } catch (error) {
            const { alert, message } = error.response.data;
            dispatch({
                type: ADD_RESERVATION_FAIL
            });
            alertMessage(alert, message);
        }
    }
}
