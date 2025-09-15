"use client";
import { MetricCard } from "./metric-card";
import { CostMetric } from "@/lib/types/cost-metrics";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { getMetricIcon } from "@/utils/get-metric-icon";
import {
  costsApi,
  useGetCostsMetricsQuery,
} from "@/lib/services/client/cost-api";
import { ChartWrapper } from "@/components/charts/chart-card";
import { useChartData } from "@/hooks/chat-data";

export default function CostMetrics({
  response,
}: {
  response: ApiResponse<CostMetric>;
}) {
  const { responseData, isLoading, handleRetry } = useChartData<
    CostMetric,
    undefined
  >({
    response,
    queryHook: useGetCostsMetricsQuery,
    queryName: "getCostsMetrics",
    apiSlice: costsApi,
  });

  return (
    <ChartWrapper
      title="Resource Utilization Overview"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={responseData.message || "Failed to load resources"}
      onRetry={handleRetry}
      className="border-none rounded-none p-0 bg-transparent"
      withTitle={false}
    >
      <div>
        <div
          data-testid="cost-metrics-card"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {responseData.status === SuccessTypes.Success &&
            responseData.data.metrics.map((metric, index) => {
              const Icon = getMetricIcon(metric.title);
              return (
                <MetricCard
                  key={index}
                  icon={Icon}
                  title={metric.title}
                  value={metric.value}
                  trend={metric.trend}
                  className="shadow-none rounded-sm"
                />
              );
            })}
        </div>
      </div>
    </ChartWrapper>
  );
}
