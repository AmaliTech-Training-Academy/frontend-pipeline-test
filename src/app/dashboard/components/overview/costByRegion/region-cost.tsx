"use client";
import { RegionCostChartProps, RegionCostData } from "@/lib/types/region-cost";
import { ChartWrapper } from "@/components/charts/chart-card";
import { CustomBarChart } from "@/components/charts/bar-chat";
import {
  costsApi,
  useGetCostsByRegionsQuery,
} from "@/lib/services/client/cost-api";
import { useChartData } from "@/hooks/chat-data";
import { SuccessTypes } from "@/lib/types/response";

export function CostByRegion({ response }: RegionCostChartProps) {
  const { responseData, isLoading, handleRetry } = useChartData<
    RegionCostData,
    { date?: string }
  >({
    response,
    queryHook: useGetCostsByRegionsQuery,
    queryName: "getCostsByRegions",
    apiSlice: costsApi,
  });
  const isEmpty =
    responseData.status === SuccessTypes.Success &&
    !responseData.data.regions.length;
  return (
    <ChartWrapper
      title="Cost by Region"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={responseData.message || "Failed to load region costs"}
      onRetry={handleRetry}
      isEmpty={isEmpty}
    >
      {responseData.status === SuccessTypes.Success && (
        <CustomBarChart
          data={responseData.data.regions}
          xAxisKey="region"
          yAxisKey="totalCost"
          yAxisFormatter={value => `$${value.toFixed(2)}`}
          tooltipFormatter={(value: number) => [
            `$${value.toLocaleString()}`,
            "",
          ]}
        />
      )}
    </ChartWrapper>
  );
}
