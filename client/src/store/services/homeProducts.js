import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeProducts = createApi({
  reducerPath: "homeProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => {
    return {
      catProducts: builder.query({
        query: (params) => {
          return {
            url: `cat-products/${params.slug}/${params.page}/${params.sort}/${params.order}`,
            method: "GET",
          };
        },
      }),
      getProductByCategory: builder.query({
        query: (slug) => ({
          url: `get-productCat/${slug}`,
          method: "GET",
        }),
      }),
      searchProducts: builder.query({
        query: (params) => {
          return {
            url: `search-products/${params.keyword}/${params.page}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useCatProductsQuery,
  useSearchProductsQuery,
  useGetProductByCategoryQuery,
} = homeProducts;
export default homeProducts;
