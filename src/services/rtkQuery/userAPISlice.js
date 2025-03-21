import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './rtkClient';
import KeychainHelper from '../../helpers/TokenHelper';

export const userAPISlice = createApi({
  reducerPath: 'userAPI',
  keepUnusedDataFor: 1, // keep Cache for 5 seconds
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted({ email, password }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await KeychainHelper.storeToken(data.data.authToken);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    signup: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: { name, email, password },
      }),
    }),
    logout: builder.mutation({
      queryFn: async () => {
        await KeychainHelper.clearToken();
        return { data: 'Logged out successfully' };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetUserInfoQuery,
  useSignupMutation,
  useLogoutMutation,
} = userAPISlice;