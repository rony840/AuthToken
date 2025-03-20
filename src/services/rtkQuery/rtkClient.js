import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import KeychainHelper from '../../helpers/TokenHelper';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'ios') {
    return 'http://localhost:8000/api';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000/api';
  }
};

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseURL(),
  prepareHeaders: async (headers) => {
    const token = await KeychainHelper.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});