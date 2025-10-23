import axios from 'axios';
import { getAccessToken } from './authCookie';

export const $api = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = getAccessToken();
        if (token) {
            config.headers['X-Token'] = token;
        }
    }
    return config;
});
