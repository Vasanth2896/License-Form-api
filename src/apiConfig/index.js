import axios from 'axios';
import { baseURL } from './apiRoutes'

export const apiInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json"
    },
    responseType: 'json'
});


apiInstance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

