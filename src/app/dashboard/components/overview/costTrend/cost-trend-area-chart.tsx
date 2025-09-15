"use client";
import { CostTrendPoint } from "@/lib/types/daily-cost-trend";
import { ReusableAreaChart } from "@/components/charts/area-chart";
import { useGetCostTrendQuery, costsApi } from "@/lib/services/client/cost-api";
import { ChartWrapper } from "@/components/charts/chart-card";
import { CostTrendAreaChartProps } from "@/lib/types";
import { useChartData } from "@/hooks/chat-data";
import { SuccessTypes } from "@/lib/types/response";
import { useMemo } from "react";

export const CostTrendAreaChart = ({ response }: CostTrendAreaChartProps) => {
  const { responseData, isLoading, handleRetry } = useChartData<
    CostTrendPoint,
    undefined
  >({
    response,
    queryHook: useGetCostTrendQuery,
    queryName: "getCostTrend",
    apiSlice: costsApi,
  });

  const formattedData = useMemo(() => {
    if (
      responseData.status !== SuccessTypes.Success ||
      !responseData.data?.costTrend
    ) {
      return [];
    }
    responseData.data.costTrend = responseData.data.costTrend.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return responseData.data.costTrend.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [responseData]);

  const isEmpty =
    responseData.status === SuccessTypes.Success && formattedData.length === 0;
  return (
    <ChartWrapper
      title="Cost Trend"
      subTitle="Last 7 days"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={responseData.message || "Failed to load cost trends"}
      onRetry={handleRetry}
      isEmpty={isEmpty}
    >
      {responseData.status === SuccessTypes.Success && (
        <ReusableAreaChart
          data={formattedData}
          xKey="date"
          yKey="totalCost"
          label="Cost Trend"
          subLabel="Last 7 days"
          color="#1D4ED8"
        />
      )}
    </ChartWrapper>
  );
};
