import http from '../http'
import {
    GET_ROOMS_REQUEST,
    GET_ROOMS_REQUEST_SUCCESS,
    GET_ROOMS_REQUEST_FAIL
} from '../constants/room';

export const getRooms = () => {
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
            dispatch({
                type: GET_ROOMS_REQUEST_FAIL,
                message: error.response.data.message
            })
        }

    }
}
