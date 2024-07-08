  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: 'auth/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      getUser: builder.query({
        query: (id) => `users/${id}`,
      }),
      updateUser: builder.mutation({
        query: ({ id, ...patch }) => ({
          url: `users/${id}`,
          method: 'PATCH',
          body: patch,
        }),
      }),
    }),
  });

  export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation } = api;