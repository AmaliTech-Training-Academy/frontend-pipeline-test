"use client";
import { CircularProgress } from "./circular-progress";
import {
  ResorcesProps,
  TopFiveResources,
} from "@/lib/types/resorce-utilization";
import { useChartData } from "@/hooks/chat-data";
import { costsApi, useGetResourcesQuery } from "@/lib/services/client/cost-api";
import { ChartWrapper } from "@/components/charts/chart-card";
import { SuccessTypes } from "@/lib/types/response";
import { percentage } from "@/utils/percentage";

export function ResourceUtilization({ response }: ResorcesProps) {
  const { responseData, isLoading, handleRetry } = useChartData<
    TopFiveResources,
    undefined
  >({
    response,
    queryHook: useGetResourcesQuery,
    queryName: "getResources",
    apiSlice: costsApi,
  });
  const isEmpty =
    responseData.status === SuccessTypes.Success &&
    responseData.data.topFiveServicesReport.services.length === 0;

  return (
    <ChartWrapper
      title="Resource Utilization Overview"
      subTitle="Top 5 Resources"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={responseData.message || "Failed to load resources"}
      onRetry={handleRetry}
      isEmpty={isEmpty}
    >
      <div
        data-testid="resource-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pb-4"
      >
        {responseData.status === SuccessTypes.Success &&
          responseData.data.topFiveServicesReport.services.map(
            (resource, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <CircularProgress
                  value={percentage(
                    resource.totalCost,
                    responseData.data.topFiveServicesReport.grandTotal
                  )}
                />
                <div className="text-center">
                  <div className="font-medium">{resource.service}</div>
                  <div className="text-sm text-muted-foreground">
                    ${resource.totalCost.toFixed(2)}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </ChartWrapper>
  );
}
