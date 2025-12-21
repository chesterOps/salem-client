import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
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
  tag: string;
  sales: number;
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
    getAllProducts: builder.query<Product[], string | undefined>({
      query: (params) =>
        `/products${params ? `?${new URLSearchParams(params)}` : ""}`,
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category: string) => `/products/category/${category}`,
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    searchProducts: builder.query<Product[], string>({
      query: (searchTerm: string) =>
        `/products?${new URLSearchParams({ search: searchTerm })}`,
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    relatedProducts: builder.query<Product[], string>({
      query: (productId: string) => `/products/${productId}/related`,
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
  }),
});
export const {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useRelatedProductsQuery,
  useGetProductsByCategoryQuery,
} = productApi;
