import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  tagTypes: "products",
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
      // create product
      cProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),

      //update product
      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/product",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),

      // delete product
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/delete/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),

      //   get product in page
      getProducts: builder.query({
        query: (page) => {
          return {
            url: `/products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),

      //   get single product
      getProduct: builder.query({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      sortProduct: builder.query({
        query: (price, title) => {
          return {
            url: `/sort-product?sort=${price},${title}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});
export const {
  useCProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useSortProductQuery,
} = productService;
export default productService;
