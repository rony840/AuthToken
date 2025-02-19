import axios from 'axios';
import KeychainHelper from '../helpers/TokenHelper';
import { Platform } from 'react-native';

// Determine the baseURL based on the platform
const getBaseURL = () => {
  if (Platform.OS === 'ios') {
    // For iOS Simulator
    return 'http://localhost:8000/api';
  } else if (Platform.OS === 'android') {
    // For Android Emulator
    return 'http://10.0.2.2:8000/api';
  }
};

// Create an Axios instance
const ClientAPI = axios.create({
  baseURL: getBaseURL(), // Use dynamic baseURL based on platform
});

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
