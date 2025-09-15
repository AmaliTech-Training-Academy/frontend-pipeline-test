import { baseApi } from "@/lib/base-api";
import { CostMetric } from "@/lib/types/cost-metrics";
import { RegionCostData } from "@/lib/types/region-cost";
import { TopFiveResources } from "@/lib/types/resorce-utilization";
import { CostTrendPoint } from "@/lib/types/daily-cost-trend";
import { CostByEnvironmentData } from "@/lib/types/cost-by-environment";
import { ApiResponse, PaginatedList } from "@/lib/types/response";
import { CostAnomaly } from "@/lib/types/cost-anomalies";
import { DateOptional } from "@/lib/types/api";
import { getCurrentDateString } from "@/utils/date-util";

export const costsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTestData: builder.query<{ foo: number }, void>({
      query: () => "test",
    }),
    getCostsMetrics: builder.query<ApiResponse<CostMetric>, DateOptional>({
      query: arg =>
        `/costs/summary-metrics?asOfDate=${arg?.date || getCurrentDateString()}`,
    }),
    getCostsByRegions: builder.query<ApiResponse<RegionCostData>, DateOptional>(
      {
        query: arg =>
          `/costs/daily-region-costs?date=${arg?.date || getCurrentDateString()}`,
      }
    ),
    getResources: builder.query<ApiResponse<TopFiveResources>, DateOptional>({
      query: arg =>
        `/costs/top-services?date=${arg?.date || getCurrentDateString()}`,
    }),
    getCostTrend: builder.query<
      ApiResponse<CostTrendPoint>,
      { days?: number } | undefined
    >({
      query: args => `costs/cost-trend?days=${args?.days || 7}`,
    }),
    getCostsByEnvironment: builder.query<
      ApiResponse<CostByEnvironmentData>,
      { date?: string } | undefined
    >({
      query: arg =>
        `/costs/daily-environment-costs?date=${arg?.date || new Date().toISOString().split("T")[0]}`,
    }),
    getCostAnomalies: builder.query<
      ApiResponse<PaginatedList<CostAnomaly>>,
      { page?: number; size?: number }
    >({
      query: ({ page = 1, size = 10 }) =>
        `costs/anomalies?page=${page}&size=${size}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCostsMetricsQuery,
  useGetCostsByRegionsQuery,
  useGetResourcesQuery,
  useGetCostTrendQuery,
  useGetCostsByEnvironmentQuery,
  useGetCostAnomaliesQuery,
  useGetTestDataQuery,
} = costsApi;
