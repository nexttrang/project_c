import axios from 'axios';
import { getAccessToken } from './authService';

const baseURL = 'https://us-central1-tinderclone-ece49.cloudfunctions.net/v1';

const request = (endpoint, method, data = {}) => {
    const url = `${baseURL}/${endpoint}`;
    const token = getAccessToken();

    const options = {
        method: method,
        url: url,
        headers: {
            token: token
        },
        data: data
    };

    return axios.request(options);
};

export default {
    request,
};