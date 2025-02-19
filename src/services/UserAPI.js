import { Alert } from 'react-native';
import KeychainHelper from '../helpers/TokenHelper';
import ClientAPI from './ClientAPI'; // Your axios instance

export const login = async (email, password) => {
  try {
    console.log('values in userAPI', email, password);
    const response = await ClientAPI.post('/users/login', { email, password });
    console.log('response after login', response.data.data.authToken)
    const token = response.data.data.authToken;
    console.log('token:',token)
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
        console.log('fetched user data: ',response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

export const signup = async (name, email, password) => {
    try {
      const response = await ClientAPI.post('/users', { name, email, password });
      return response.message;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

export const logout = async () => {
    try {
        await KeychainHelper.clearToken();
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};