import getter from './getter';
import logger from './logger';

const unixTime = (time1) => {
    const timeNow = getter.unixTimeNow();
    return timeNow - time1;
};

export default {
    unixTime
};