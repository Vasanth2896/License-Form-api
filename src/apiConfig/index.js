import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json"
    },
    responseType: 'json'
});


apiInstance.interceptors.response.use(response => {
    console.log(response);
    return response;
},
    error => {
        console.log(error);
        return Promise.reject(error);
    });

