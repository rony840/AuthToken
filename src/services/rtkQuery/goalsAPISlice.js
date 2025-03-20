import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './rtkClient';

export const goalsAPISlice = createApi({
  reducerPath: 'goalsAPI',
  baseQuery,
  endpoints: (builder) => ({
    addGoal: builder.mutation({
      query: (title) => ({
        url: '/goals',
        method: 'POST',
        body: { title },
      }),
    }),
    getGoals: builder.query({
      query: () => '/goals',
    }),
    editGoal: builder.mutation({
      query: ({ id, title }) => ({
        url: `/goals/${id}`,
        method: 'PUT',
        body: { title },
      }),
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({
        url: `/goals/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddGoalMutation,
  useGetGoalsQuery,
  useEditGoalMutation,
  useDeleteGoalMutation,
} = goalsAPISlice;
