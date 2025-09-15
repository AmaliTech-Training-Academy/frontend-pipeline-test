import { render, screen, fireEvent } from "@testing-library/react";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { TopFiveResources } from "@/lib/types/resorce-utilization";
import * as chatData from "@/hooks/chat-data";
import { ResourceUtilization } from "../resorce-utilization";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));
describe("ResourceUtilization", () => {
  const mockHandleRetry = vi.fn();

  const createMockResponse = (
    status: SuccessTypes.Success | SuccessTypes.Fail,
    data?: TopFiveResources,
    message?: string
  ): ApiResponse<TopFiveResources> => {
    if (status === SuccessTypes.Success) {
      return {
        status: SuccessTypes.Success,
        data: data || {
          topFiveServicesReport: { grandTotal: 0, services: [] },
        },
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
      responseData: createMockResponse(SuccessTypes.Fail),
      isLoading: true,
      handleRetry: mockHandleRetry,
    });

    render(
      <ResourceUtilization
        response={createMockResponse(
          SuccessTypes.Fail,
          undefined,
          "something happened"
        )}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error state and handles retry", () => {
    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMockResponse(
        SuccessTypes.Fail,
        undefined,
        "Network error"
      ),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <ResourceUtilization response={createMockResponse(SuccessTypes.Fail)} />
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("retry-button"));
    expect(mockHandleRetry).toHaveBeenCalledTimes(1);
  });

  it("renders resource data correctly", () => {
    const mockData = {
      topFiveServicesReport: {
        grandTotal: 100,
        services: [
          { service: "EC2", totalCost: 75 },
          { service: "EC4", totalCost: 25 },
        ],
      },
    };

    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMockResponse(SuccessTypes.Success, mockData),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <ResourceUtilization
        response={createMockResponse(SuccessTypes.Success, mockData)}
      />
    );

    expect(screen.getByTestId("resource-grid")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    vi.spyOn(chatData, "useChartData").mockReturnValue({
      responseData: createMockResponse(SuccessTypes.Success, {
        topFiveServicesReport: { grandTotal: 0, services: [] },
      }),
      isLoading: false,
      handleRetry: mockHandleRetry,
    });

    render(
      <ResourceUtilization
        response={createMockResponse(SuccessTypes.Success, {
          topFiveServicesReport: { grandTotal: 0, services: [] },
        })}
      />
    );

    expect(screen.queryByText("Optimize")).not.toBeInTheDocument();
  });
});
