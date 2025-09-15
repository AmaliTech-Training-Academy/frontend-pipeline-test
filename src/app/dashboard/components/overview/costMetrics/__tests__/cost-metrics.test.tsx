import { render, screen, fireEvent } from "@testing-library/react";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { CostMetric } from "@/lib/types/cost-metrics";
import * as chatData from "@/hooks/chat-data";
import CostMetrics from "../cost-metrics";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

describe("CostMetrics", () => {
  const mockHandleRetry = vi.fn();
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
  it("displays loading state", async () => {
    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMetricsMockResponse(SuccessTypes.Fail),
      isLoading: true,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostMetrics
        response={createMetricsMockResponse(
          SuccessTypes.Fail,
          { metrics: [] },
          "something happened"
        )}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error state and handles retry", () => {
    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMetricsMockResponse(
        SuccessTypes.Fail,
        undefined,
        "Network error"
      ),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostMetrics response={createMetricsMockResponse(SuccessTypes.Fail)} />
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("retry-button"));
    expect(mockHandleRetry).toHaveBeenCalledTimes(1);
  });

  it("renders metrics data correctly", () => {
    const mockData = {
      metrics: [
        {
          title: "Total Spend",
          value: "$1,637,425.9",
          trend: { value: "+2%", positive: true },
        },
        {
          title: "Monthly Projection",
          value: "$272,904.317",
          trend: { value: "-5%", positive: false },
        },
        {
          title: "Potential Savings",
          value: "$14,840",
          trend: { value: "+3%", positive: true },
        },
      ],
    };

    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMetricsMockResponse(SuccessTypes.Success, mockData),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostMetrics
        response={createMetricsMockResponse(SuccessTypes.Success, mockData)}
      />
    );

    expect(screen.getByTestId("cost-metrics-card")).toBeInTheDocument();

    expect(screen.getByText("Total Spend")).toBeInTheDocument();
    expect(screen.getByText("$1,637,425.9")).toBeInTheDocument();
  });
});
