import { screen, waitFor } from "@testing-library/react";
import * as handleErros from "@/utils/get-error-message";
import * as metricsData from "@/lib/services/server/cost-metrics";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import * as costsApi from "@/lib/services/client/cost-api";
import { renderWithProviders } from "@/utils/test-utils";
import { CostMetric } from "@/lib/types/cost-metrics";
import CostMetricsSection from "../cost-metrics-section";

describe("CostMetricsSection", () => {
  const createMetricsMockResponse = (
    status: SuccessTypes.Success | SuccessTypes.Fail,
    data?: CostMetric,
    message?: string
  ): ApiResponse<CostMetric> => {
    if (status === SuccessTypes.Success) {
      return {
        status: SuccessTypes.Success,
        data: data || { metrics: [] },
        message,
      };
    } else {
      return {
        status: SuccessTypes.Fail,
        message: message || "Unknown error",
      };
    }
  };

  it("fetches and passes successful response to child component", async () => {
    const ResourceSection = await CostMetricsSection({ date: "2023-01-01" });
    const mockGetErrorMessage = vi.spyOn(handleErros, "getErrorMessage");
    renderWithProviders(ResourceSection);

    await waitFor(() => {
      expect(mockGetErrorMessage).not.toHaveBeenCalled();
      expect(screen.getByTestId("cost-metrics-card")).toBeInTheDocument();
    });
  });

  it("handles server error and passes error response to child", async () => {
    vi.spyOn(metricsData, "fetchCostMetrics").mockResolvedValue(
      createMetricsMockResponse(
        SuccessTypes.Fail,
        undefined,
        "Server error occurred"
      )
    );
    const resourceQueryHook = vi.spyOn(costsApi, "useGetCostsMetricsQuery");

    const CostSection = await CostMetricsSection({ date: "2023-01-01" });
    renderWithProviders(CostSection);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Server error occurred")).toBeInTheDocument();
    expect(resourceQueryHook).toHaveBeenCalledTimes(1);
  });
});
