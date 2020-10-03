import {combineReducers} from 'redux';
import authReducer from './authReducer';
import roomReducer from './roomReducer';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    room: roomReducer,
    reservation: reservationReducer,
});

export default rootReducer;