import Axios from 'axios';
import _ from 'lodash';

// const instance = axios.create({
//     baseURL : 'http:localhost:8800',
//     headers : {'X-Requested-With' : 'XMLHttpRequest'},
//     withCredentials:true
// });

// axios.defaults.baseURL = 'http:localhost:5000';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const baseURLStaging = 'http://localhost:5000/';

const axios = Axios.create({
    baseURL: baseURLStaging,
});

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default axios;
