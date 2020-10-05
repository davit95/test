import http from '../http'
import {
    GET_ROOMS_REQUEST,
    GET_ROOMS_REQUEST_SUCCESS,
    GET_ROOMS_REQUEST_FAIL
} from '../constants/room';
import {alertMessage} from '../components/Alert/Alert';

export const getRooms = (alert) => {
    return async (dispatch, getState) => {
        dispatch({
            type: GET_ROOMS_REQUEST
        })
        try {
            const response = await http.get('rooms');
            const rooms = response.data;
            dispatch({
                type: GET_ROOMS_REQUEST_SUCCESS,
                rooms: rooms
            });
        } catch (error) {
            const { message, alert } = error.response.data;
            dispatch({
                type: GET_ROOMS_REQUEST_FAIL,
                message: message
            });
            alertMessage(alert, message);
        }

    }
}
