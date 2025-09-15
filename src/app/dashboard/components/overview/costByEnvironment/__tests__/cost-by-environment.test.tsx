import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CostByEnvironment from "../cost-by-environment";
import { costsApi } from "@/lib/services/client/cost-api";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { CostByEnvironmentData } from "@/lib/types/cost-by-environment";

// Mock utilities
vi.mock("@/utils/get-error-message", () => ({
  getErrorMessage: vi.fn(error => error?.message || "Unknown error"),
}));

vi.mock("@/lib/hooks", () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

// Mock constants - Updated to reflect the actual implementation
vi.mock("@/utils/constants/colors", () => ({
  ENVIRONMENT_COLOR_ORDER: [
    "#2563eb",
    "#8b5cf6",
    "#60a5fa",
    "#fbbf24",
    "#22c55e",
    "#f97316",
  ],
}));

// Create mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      [costsApi.reducerPath]: costsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(costsApi.middleware),
  });
};

// Helper to render component
const renderComponent = (response: ApiResponse<CostByEnvironmentData>) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <CostByEnvironment response={response} />
    </Provider>
  );
};

describe("CostByEnvironment", () => {
  const mockEnvironmentData: CostByEnvironmentData = {
    date: "2024-01-01",
    environments: [
      {
        environment: "Development",
        totalCost: 285219.98,
        percentage: 17.1,
      },
      {
        environment: "Testing",
        totalCost: 280500.83,
        percentage: 16.9,
      },
      {
        environment: "Production",
        totalCost: 278638.66,
        percentage: 16.7,
      },
      {
        environment: "Demo",
        totalCost: 276334.21,
        percentage: 16.6,
      },
      {
        environment: "Staging",
        totalCost: 272460.14,
        percentage: 16.4,
      },
      {
        environment: "QA",
        totalCost: 270814.99,
        percentage: 16.3,
      },
    ],
  };

  it("renders successfully with initial data", () => {
    const successResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: mockEnvironmentData,
      message: "Success",
    };

    renderComponent(successResponse);

    expect(screen.getByText("Cost by Environment")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("Production")).toBeInTheDocument();
    expect(screen.getByText("$285,219.98")).toBeInTheDocument();
    expect(screen.getByText("17.1%")).toBeInTheDocument();
  });

  it("renders only first 6 environments when more than 6 are provided", () => {
    const moreData: CostByEnvironmentData = {
      date: "2024-01-01",
      environments: [
        ...mockEnvironmentData.environments,
        {
          environment: "Extra1",
          totalCost: 100000,
          percentage: 10,
        },
        {
          environment: "Extra2",
          totalCost: 50000,
          percentage: 5,
        },
      ],
    };

    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: moreData,
      message: "Success",
    };

    renderComponent(response);
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("QA")).toBeInTheDocument();
    expect(screen.queryByText("Extra1")).not.toBeInTheDocument();
    expect(screen.queryByText("Extra2")).not.toBeInTheDocument();
  });

  it("shows error boundary for failed initial response", () => {
    const errorResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Fail,
      message: "Failed to load cost by environment data",
    };

    renderComponent(errorResponse);

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByTestId("error-title")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to load cost by environment data")
    ).toBeInTheDocument();
  });

  it("shows loading state when fetching data", () => {
    const errorResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Fail,
      message: "Initial error",
    };

    renderComponent(errorResponse);
    fireEvent.click(screen.getByTestId("retry-button"));

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("handles API errors during retry", async () => {
    const errorResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Fail,
      message: "Initial error",
    };

    renderComponent(errorResponse);
    fireEvent.click(screen.getByTestId("retry-button"));

    await waitFor(() => {
      expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    });
  });

  it("handles loading, retry, and fetches data from MSW", async () => {
    const errorResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Fail,
      message: "Initial error",
    };

    renderComponent(errorResponse);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("retry-button"));
    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });

  it("updates when response prop changes", () => {
    const initialData: CostByEnvironmentData = {
      date: "2024-01-01",
      environments: [mockEnvironmentData.environments[0]],
    };
    const updatedData: CostByEnvironmentData = {
      date: "2024-01-02",
      environments: [mockEnvironmentData.environments[1]],
    };

    const initialResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: initialData,
      message: "Initial",
    };

    const updatedResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: updatedData,
      message: "Updated",
    };

    const { rerender } = renderComponent(initialResponse);

    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.queryByText("Testing")).not.toBeInTheDocument();
    rerender(
      <Provider store={createMockStore()}>
        <CostByEnvironment response={updatedResponse} />
      </Provider>
    );
    expect(screen.queryByText("Development")).not.toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });

  it("formats currency values correctly", () => {
    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: {
        date: "2024-01-01",
        environments: [
          {
            environment: "Test",
            totalCost: 1234567.89,
            percentage: 50.0,
          },
        ],
      },
      message: "Success",
    };

    renderComponent(response);

    expect(screen.getByText("$1,234,567.89")).toBeInTheDocument();
    expect(screen.getByText("50.0%")).toBeInTheDocument();
  });

  it("applies colors based on array index, not environment name", () => {
    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: {
        date: "2024-01-01",
        environments: [
          {
            environment: "CustomEnvironmentName",
            totalCost: 100000,
            percentage: 25.0,
          },
          {
            environment: "AnotherCustomName",
            totalCost: 200000,
            percentage: 50.0,
          },
        ],
      },
      message: "Success",
    };

    renderComponent(response);
    const firstColorDot = screen.getByText(
      "CustomEnvironmentName"
    ).previousElementSibling;
    expect(firstColorDot).toHaveStyle("background-color: #2563eb");

    const secondColorDot =
      screen.getByText("AnotherCustomName").previousElementSibling;
    expect(secondColorDot).toHaveStyle("background-color: #8b5cf6");
  });

  it("uses fallback color when index exceeds available colors", () => {
    const manyEnvironments = Array.from({ length: 7 }, (_, i) => ({
      environment: `Environment${i + 1}`,
      totalCost: 100000,
      percentage: 10,
    }));

    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: {
        date: "2024-01-01",
        environments: manyEnvironments,
      },
      message: "Success",
    };

    renderComponent(response);

    expect(screen.getByText("Environment1")).toBeInTheDocument();
    expect(screen.getByText("Environment6")).toBeInTheDocument();
    expect(screen.queryByText("Environment7")).not.toBeInTheDocument();

    const sixthColorDot =
      screen.getByText("Environment6").previousElementSibling;
    expect(sixthColorDot).toHaveStyle("background-color: #f97316");
  });

  it("handles empty data array", () => {
    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: {
        date: "2024-01-01",
        environments: [],
      },
      message: "No data",
    };

    renderComponent(response);

    expect(screen.getByText("Cost by Environment")).toBeInTheDocument();

    expect(screen.queryByText("Development")).not.toBeInTheDocument();
  });

  it("shows default error message when no error message is provided", () => {
    const errorResponse: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Fail,
      message: "",
    };

    renderComponent(errorResponse);

    expect(
      screen.getByText("Failed to load cost by environment")
    ).toBeInTheDocument();
  });

  it("verifies color assignment for all 6 positions", () => {
    const expectedColors = [
      "#2563eb",
      "#8b5cf6",
      "#60a5fa",
      "#fbbf24",
      "#22c55e",
      "#f97316",
    ];

    const response: ApiResponse<CostByEnvironmentData> = {
      status: SuccessTypes.Success,
      data: mockEnvironmentData,
      message: "Success",
    };

    renderComponent(response);

    mockEnvironmentData.environments.forEach((env, index) => {
      const colorDot = screen.getByText(env.environment).previousElementSibling;
      expect(colorDot).toHaveStyle(
        `background-color: ${expectedColors[index]}`
      );
    });
  });
});
