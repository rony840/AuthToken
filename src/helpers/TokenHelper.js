import * as Keychain from 'react-native-keychain';

class KeychainHelper {
  
  // Store the token securely
 async storeToken (token) {
    console.log('token in helper:',token)
    try {
      if (!token) {
        throw new Error('Token is undefined or null');
      }
      await Keychain.setGenericPassword('authToken', token);
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  // Retrieve the token
 async getToken() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        console.warn('No token found in Keychain');
        return null;
      }
      return credentials.password;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  // Clear the token from storage
 async clearToken() {
    try {
      const result = await Keychain.resetGenericPassword();
      console.log('Token cleared successfully', result);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }
}

export default new KeychainHelper ();
