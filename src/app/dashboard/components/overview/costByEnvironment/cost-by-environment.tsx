"use client";
import { CostByEnvironmentData } from "@/lib/types/cost-by-environment";
import {
  costsApi,
  useGetCostsByEnvironmentQuery,
} from "@/lib/services/client/cost-api";
import { ChartWrapper } from "@/components/charts/chart-card";
import { CostByEnvironmentProps } from "@/lib/types";
import { ENVIRONMENT_COLOR_ORDER } from "@/utils/constants/colors";
import { useChartData } from "@/hooks/chat-data";
import { SuccessTypes } from "@/lib/types/response";

const CostByEnvironment = ({ response }: CostByEnvironmentProps) => {
  const { responseData, isLoading, handleRetry } = useChartData<
    CostByEnvironmentData,
    undefined
  >({
    response,
    queryHook: useGetCostsByEnvironmentQuery,
    queryName: "getCostsByEnvironment",
    apiSlice: costsApi,
  });

  const isEmplty =
    responseData.status === SuccessTypes.Success &&
    responseData?.data?.environments?.length === 0;
  return (
    <ChartWrapper
      title="Cost by Environment"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={
        responseData.message || "Failed to load cost by environment"
      }
      onRetry={handleRetry}
      isEmpty={isEmplty}
    >
      <div data-testid="cost-by-environment-card" className="px-6 pb-6">
        <div className="space-y-4 overflow-x-auto">
          {responseData.status === SuccessTypes.Success &&
            responseData?.data?.environments?.slice(0, 6)?.map((env, idx) => (
              <div
                key={env.environment}
                className="flex items-center justify-between gap-4 min-w-[320px] sm:min-w-0"
              >
                {/* Left: Dot + Name */}
                <div className="flex items-center gap-2 min-w-[120px] flex-shrink-0">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ENVIRONMENT_COLOR_ORDER[idx] || "#888",
                    }}
                  />
                  <span className="font-medium">
                    {env.environment === "unknown"
                      ? "Uncategorized"
                      : env.environment}
                  </span>
                </div>
                {/* Right: Value, Percent, Progress */}
                <div className="flex-1 flex flex-col items-end min-w-0 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                  <div className="flex items-center gap-3 w-full justify-between min-w-0">
                    <span className="font-semibold tabular-nums truncate">
                      $
                      {env.totalCost.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {env.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded mt-1">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${env.percentage}%`,
                        backgroundColor: ENVIRONMENT_COLOR_ORDER[idx] || "#888",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </ChartWrapper>
  );
};

export default CostByEnvironment;
