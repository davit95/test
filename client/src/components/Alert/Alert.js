import React from 'react';
import {message} from 'antd';

export const success = (alertMessage) => {
    message.success(alertMessage);
};

export const error = (alertMessage) => {
    message.error(alertMessage);
};

export const warning = (alertMessage) => {
    message.warning(alertMessage);
}
