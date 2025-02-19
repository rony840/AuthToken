import axios from 'axios';
import KeychainHelper from '../helpers/TokenHelper';

// Create an Axios instance
const ClientAPI = axios.create({
  baseURL: 'http://10.0.2.2:8000/api', // Change this to your server URL
  timeout: 10000,
});// for android http://10.0.2.2:8000/api
//for ios http://localhost:8000/api

// Request interceptor to add Authorization token (if needed)
ClientAPI.interceptors.request.use(
    async (config) => {
        const token = await KeychainHelper.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
ClientAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response) {
      // The server responded with a status code outside the range 2xx
      console.error('Response error:', error.response);
    } else if (error.request) {
      // No response was received from the server
      console.error('Request error:', error.request);
    } else {
      // Something else went wrong
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default ClientAPI;
