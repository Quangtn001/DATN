import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderService = createApi({
  reducerPath: "orders",
  tagTypes: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getOrders: builder.query({
        query: (page) => {
          return {
            url: `/orders/?page=${page}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      details: builder.query({
        query: (id) => {
          return {
            url: `/order-details/${id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
      updateOrder: builder.mutation({
        query: ({ id, status }) => ({
          url: `/order-update/${id}`,
          method: "PUT",
          body: { status },
        }),
        invalidatesTags: ["orders"],
      }),

      createOrder: builder.mutation({
        query: (body) => {
          return {
            url: `/order-cod`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["orders"],
      }),
      allOrders: builder.query({
        query: () => {
          return {
            url: "allorders",
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useGetOrdersQuery,
  useDetailsQuery,
  useCreateOrderMutation,
  useAllOrdersQuery,
  useUpdateOrderMutation,
} = orderService;
export default orderService;
