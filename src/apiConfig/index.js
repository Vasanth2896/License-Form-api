import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        Accept: "application/json"
    },
    responseType: 'json'
});


instance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

