import { isMobile } from 'react-device-detect';
import logger from '../helper/logger';

const showToast = (toast) => {
    if (isMobile) {
        logger.log("Show toast on mobile")
        Mobile.showToast(toast);
    }
}

export default {
    showToast,
}