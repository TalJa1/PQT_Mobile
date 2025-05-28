import axios from 'axios';

// import { API_BASE_URL } from './../env.d';
// import {Platform} from 'react-native';

// const HOST_IP = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'; // This is the default IP for Android emulator to access localhost
// const HOST_IP = Platform.OS === 'android' ? 'localhost' : 'localhost'; // This is for physical devices
// const API_BASE_URL = `http://${HOST_IP}:8000/api/v1`; // This is for localhost

const API_BASE_URL = 'https://pqt-api-talja1s-projects.vercel.app/api/v1';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  config => {
    // Do something before request is sent, like adding an auth token
    // const token = await AsyncStorage.getItem('userToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Example: handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
