import { Alert } from 'react-native';
import KeychainHelper from '../helpers/TokenHelper';
import ClientAPI from './ClientAPI'; // Your axios instance

export const login = async (email, password) => {
  try {
    const response = await ClientAPI.post('/users/login', { email, password });
    const token = response.data.data.authToken;
    await KeychainHelper.storeToken(token); // Store token in Keychain
    Alert.alert(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
    try {
      const response = await ClientAPI.get('/users');
      return response.data.data;
    } catch (error) {
      console.error('Fetch failed:', error);
      throw error;
    }
  };

export const signup = async (name, email, password) => {
    try {
      const response = await ClientAPI.post('/users', { name, email, password });
      return response.message;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

export const logout = async () => {
    try {
        await KeychainHelper.clearToken();
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};