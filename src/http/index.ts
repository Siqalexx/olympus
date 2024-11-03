import axios from 'axios';

export const BASE_URL = 'https://api.olympus.ydns.eu';

const $api = axios.create({
    baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.set('ngrok-skip-browser-warning', 'true');
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return config;
});

export default $api;
