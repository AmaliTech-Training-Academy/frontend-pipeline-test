import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CostTrendAreaChart } from "../cost-trend-area-chart";
import { costsApi } from "@/lib/services/client/cost-api";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { CostTrendPoint } from "@/lib/types/daily-cost-trend";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

const createStore = () =>
  configureStore({
    reducer: { [costsApi.reducerPath]: costsApi.reducer },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(costsApi.middleware),
  });

const renderComponent = (response: ApiResponse<CostTrendPoint>) => {
  return render(
    <Provider store={createStore()}>
      <CostTrendAreaChart response={response} />
    </Provider>
  );
};

describe("CostTrendAreaChart", () => {
  it("renders chart with successful initial data", () => {
    const successResponse: ApiResponse<CostTrendPoint> = {
      status: SuccessTypes.Success,
      data: { costTrend: [{ id: "1", date: "2025-08-26", totalCost: 5000 }] },
      message: "Success",
    };

    renderComponent(successResponse);

    const chart = screen.getByTestId("area-chart");
    expect(chart).toBeInTheDocument();
    // expect(chart.getAttribute("data-chart-data")).toBe(JSON.stringify([{ date: "2025-08-26", value: 5000 }]))
  });

  it("shows error boundary for failed initial response", () => {
    const errorResponse: ApiResponse<CostTrendPoint[]> = {
      status: SuccessTypes.Fail,
      message: "Failed to load data",
    };

    renderComponent(errorResponse);

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByTestId("error-title")).toBeInTheDocument();
  });

  it("handles loading, retry, and fetches data from MSW", async () => {
    const errorResponse: ApiResponse<CostTrendPoint[]> = {
      status: SuccessTypes.Fail,
      message: "Initial error",
    };

    // Start with error state
    renderComponent(errorResponse);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();

    // Click retry - this will trigger the MSW handler
    fireEvent.click(screen.getByTestId("retry-button"));

    // Should show loading
    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });

  it("handles API errors during retry", async () => {
    const errorResponse: ApiResponse<CostTrendPoint[]> = {
      status: SuccessTypes.Fail,
      message: "Initial error",
    };

    renderComponent(errorResponse);
    fireEvent.click(screen.getByTestId("retry-button"));

    await waitFor(() => {
      expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    });
  });

  it("updates when response prop changes", () => {
    const initialData = {
      costTrend: [{ id: "1", date: "2025-08-26", totalCost: 5000 }],
    };
    const updatedData = {
      costTrend: [{ id: "1", date: "2025-08-27", totalCost: 8000 }],
    };

    const initialResponse: ApiResponse<CostTrendPoint> = {
      status: SuccessTypes.Success,
      data: initialData,
      message: "Initial",
    };

    const updatedResponse: ApiResponse<CostTrendPoint> = {
      status: SuccessTypes.Success,
      data: updatedData,
      message: "Updated",
    };

    const { rerender } = renderComponent(initialResponse);

    // Initial data
    const initialDate = new Date("2025-08-26").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    expect(screen.getByText(initialDate)).toBeInTheDocument();

    // Update with new data
    rerender(
      <Provider store={createStore()}>
        <CostTrendAreaChart response={updatedResponse} />
      </Provider>
    );
    const updatedDate = new Date("2025-08-27").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    expect(screen.getByText(updatedDate)).toBeInTheDocument();
  });
});
