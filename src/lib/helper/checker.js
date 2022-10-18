import comparator from './comparator';
import logger from './logger';

const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (password) => {
    return password.length > 5;
};

const isConnectorNotFoundError = (str) => {
    return str.includes('ConnectorNotFoundError');
};

const validateLocalAssetData = (localData) => {
    if (!localData) {
        logger.log('validateLocalAssetData: false - localData: empty');
        return false;
    }

    const diffTime = comparator.unixTime(localData.timestamp);
    const validate = diffTime >= 0 && diffTime < 86400;
    logger.log(`validateLocalAssetData: ${validate} - diffTime: ${diffTime}`);
    return validate;
};

export default {
    isValidEmail,
    isStrongPassword,
    isConnectorNotFoundError,
    validateLocalAssetData
};
