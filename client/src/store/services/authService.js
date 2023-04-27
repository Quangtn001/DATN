import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  tagTypes: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      userRegister: builder.mutation({
        query: (data) => {
          return {
            url: "/register",
            method: "POST",
            body: data,
          };
        },
      }),
      userLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "/login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      forgotPassword: builder.mutation({
        query: ({ email }) => ({
          url: "/forgot-password",
          method: "POST",
          body: { email },
        }),
      }),
      resetPassword: builder.mutation({
        query: ({ token, password }) => ({
          url: "/reset-password",
          method: "PUT",
          body: { token, password },
        }),
      }),
      getUserById: builder.query({
        query: (id) => {
          return {
            url: `user/${id}`,
            method: "GET",
          };
        },
        providesTags: ["users"],
      }),
      updateUser: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `/user/${id}`,
          method: "PUT",
          body: data,
        }),
      }),
      allUsers: builder.query({
        query: () => {
          return {
            url: "all-user",
            method: "GET",
          };
        },
      }),
      deleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `delete-user/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["users"],
      }),
    };
  },
});
export const {
  useAuthLoginMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
} = authService;
export default authService;
