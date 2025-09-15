import { baseApi } from "@/lib/base-api";

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCosts: builder.query({
      query: () => "costs",
    }),
    getCostById: builder.query({
      query: id => `costs/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCostsQuery, useGetCostByIdQuery } = postsApi;
