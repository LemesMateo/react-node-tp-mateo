import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:500"}),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return{
          url: "api/users/login",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: "api/users/register",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation  } = authApi;