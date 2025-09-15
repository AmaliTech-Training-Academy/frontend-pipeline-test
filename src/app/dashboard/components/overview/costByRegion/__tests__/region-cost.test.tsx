import { render, screen, fireEvent } from "@testing-library/react";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import * as chatData from "@/hooks/chat-data";
import { CostByRegion } from "../region-cost";
import { RegionCostData } from "@/lib/types/region-cost";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

describe("Cost by region", () => {
  const mockHandleRetry = vi.fn();
  const createRegionMockResponse = (
    status: SuccessTypes.Success | SuccessTypes.Fail,
    data?: RegionCostData,
    message?: string
  ): ApiResponse<RegionCostData> => {
    if (status === SuccessTypes.Success) {
      return {
        status: SuccessTypes.Success,
        data: data || { regions: [] },
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
      responseData: createRegionMockResponse(SuccessTypes.Fail),
      isLoading: true,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostByRegion
        response={createRegionMockResponse(
          SuccessTypes.Fail,
          { regions: [] },
          "something happened"
        )}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
  it("displays error state and handles retry", () => {
    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createRegionMockResponse(
        SuccessTypes.Fail,
        undefined,
        "Network error"
      ),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostByRegion response={createRegionMockResponse(SuccessTypes.Fail)} />
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("retry-button"));
    expect(mockHandleRetry).toHaveBeenCalledTimes(1);
  });

  it("renders region cost data correctly", () => {
    const mockData = {
      regions: [
        { region: "ap-south-1", totalCost: 135000 },
        { region: "ap-southeast-1", totalCost: 170000 },
        { region: "eu-central-1", totalCost: 75000 },
        { region: "sa-east-1", totalCost: 65000 },
        { region: "euu-west-1", totalCost: 110000 },
      ],
    };

    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createRegionMockResponse(SuccessTypes.Success, mockData),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <CostByRegion
        response={createRegionMockResponse(SuccessTypes.Success, mockData)}
      />
    );

    expect(screen.getByText("ap-southeast-1")).toBeInTheDocument();
    expect(screen.getByText("euu-west-1")).toBeInTheDocument();
  });
});
