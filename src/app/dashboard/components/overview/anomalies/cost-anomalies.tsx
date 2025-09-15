"use client";
import AppTable from "@/components/custom/app-table";
import {
  CostAnomaliesParams,
  CostAnomaliesResponse,
  CostAnomaly,
} from "@/lib/types/cost-anomalies";
import React from "react";
import { costAnomalyColumns } from "./anomaly-columns";
import AnomalyActions from "./actions";
import { ChartWrapper } from "@/components/charts/chart-card";
import {
  costsApi,
  useGetCostAnomaliesQuery,
} from "@/lib/services/client/cost-api";
import { usePaginatedData } from "@/hooks/paginated-data";
import { RTKQueryHook } from "@/lib/types/data-hooks";
import { ApiResponse, PaginatedList, SuccessTypes } from "@/lib/types/response";

const useCostAnomaliesQuery = (
  params: CostAnomaliesParams | undefined,
  options: Parameters<typeof useGetCostAnomaliesQuery>[1]
) => useGetCostAnomaliesQuery(params ?? { page: 0, size: 10 }, options);

export default function CostAnomalies({ response }: CostAnomaliesResponse) {
  const { responseData, isLoading, handleRetry } = usePaginatedData<
    CostAnomaly,
    CostAnomaliesParams
  >({
    response,
    queryHook: useCostAnomaliesQuery as unknown as RTKQueryHook<
      CostAnomaliesParams | undefined,
      ApiResponse<PaginatedList<CostAnomaly>>
    >,
    queryName: "getCostAnomalies",
    apiSlice: costsApi,
    initialParams: { page: 0, size: 10 },
  });
  return (
    <ChartWrapper
      title="Recent Cost Anomalies"
      isLoading={isLoading}
      hasError={responseData.status === SuccessTypes.Fail}
      errorMessage={responseData.message || "Failed to load cost anomalies"}
      onRetry={handleRetry}
      contentClassName="pt-3"
      className="pb-4"
    >
      {responseData.status === SuccessTypes.Success && (
        <AppTable<CostAnomaly>
          columns={costAnomalyColumns}
          data={responseData.data.items}
          renderActions={anomaly => <AnomalyActions anomaly={anomaly} />}
          actionsLabel="Actions"
          className="border-none rounded-none mb-3"
        />
      )}
      {/* // we will be adding pagination if recommended */}
    </ChartWrapper>
  );
}
