import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './rtkClient';
import KeychainHelper from '../../helpers/TokenHelper';

export const userAPISlice = createApi({
  reducerPath: 'userAPI',
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
      query: () => '/users',
      keepUnusedDataFor: 20, // keep Cache for 20 seconds
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
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useSignupMutation,
  useLogoutMutation,
} = userAPISlice;