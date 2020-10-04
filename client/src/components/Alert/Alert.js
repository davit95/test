import {message} from 'antd';
import {
    ALERT_WARNING,
    ALERT_SUCCESS,
    ALERT_ERROR
} from '../../constants/alerts';

const success = (alertMessage) => {
    message.success(alertMessage);
};

const error = (alertMessage) => {
    message.error(alertMessage);
};

const warning = (alertMessage) => {
    message.warning(alertMessage);
}

export const alertMessage = (type, message) => {
    switch (type) {
        case ALERT_WARNING:
            return warning(message);
        case ALERT_SUCCESS:
            return success(message);
        case ALERT_ERROR:
            return error(message);
        default:
                return
    }
}
