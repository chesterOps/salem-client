import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: string;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  description: string;
  colors: Array<{
    hex: string;
    name: string;
  }>;
  slug: string;
  sizes: string[];
  images: string[];
  mainImage: string;
}

interface ProductResponse {
  data: Product;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  keepUnusedDataFor: 120,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getProductById: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
      transformResponse: (response: ProductResponse) => response.data,
    }),
  }),
});
export const { useGetProductByIdQuery } = productApi;
