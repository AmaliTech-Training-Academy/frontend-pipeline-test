import { screen, waitFor } from "@testing-library/react";
import ResourceUtilizationSection from "../resorce-utilization-section";
import * as handleErros from "@/utils/get-error-message";
import * as resourcesData from "@/lib/services/server/cost-metrics";
import { TopFiveResources } from "@/lib/types/resorce-utilization";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import * as costsApi from "@/lib/services/client/cost-api";
import { renderWithProviders } from "@/utils/test-utils";

describe("ResourceUtilizationSection", () => {
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
  it("fetches and passes successful response to child component", async () => {
    const ResourceSection = await ResourceUtilizationSection({
      date: "2023-01-01",
    });
    const mockGetErrorMessage = vi.spyOn(handleErros, "getErrorMessage");
    renderWithProviders(ResourceSection);

    await waitFor(() => {
      expect(mockGetErrorMessage).not.toHaveBeenCalled();
      expect(screen.getByTestId("resource-grid")).toBeInTheDocument();
    });
  });

  it("handles server error and passes error response to child", async () => {
    vi.spyOn(resourcesData, "fetchResources").mockResolvedValue(
      createMockResponse(SuccessTypes.Fail, undefined, "Server error occurred")
    );
    const resourceQueryHook = vi.spyOn(costsApi, "useGetResourcesQuery");

    const ResourceSection = await ResourceUtilizationSection({
      date: "2023-01-01",
    });
    renderWithProviders(ResourceSection);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Server error occurred")).toBeInTheDocument();
    expect(resourceQueryHook).toHaveBeenCalledTimes(1);
  });
});
