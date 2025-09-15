import { screen, waitFor } from "@testing-library/react";
import RegionCostSection from "../region-cost-section";
import * as handleErros from "@/utils/get-error-message";
import * as costsApi from "@/lib/services/client/cost-api";
import * as regionCostData from "@/lib/services/server/cost-metrics";
import { renderWithProviders } from "@/utils/test-utils";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { RegionCostData } from "@/lib/types/region-cost";

describe("RegionCostSection", () => {
  const createRegionSectionMockResponse = (
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

  it("fetches and passes successful response to child component", async () => {
    const ResourceSection = await RegionCostSection({ date: "2023-01-01" });
    const mockGetErrorMessage = vi.spyOn(handleErros, "getErrorMessage");
    renderWithProviders(ResourceSection);

    await waitFor(() => {
      expect(mockGetErrorMessage).not.toHaveBeenCalled();
      expect(screen.getByText("ap-southeast-1")).toBeInTheDocument();
    });
  });

  it("handles server error and passes error response to child", async () => {
    vi.spyOn(regionCostData, "fetchRegionCost").mockResolvedValue(
      createRegionSectionMockResponse(
        SuccessTypes.Fail,
        undefined,
        "Server error occurred"
      )
    );
    const resourceQueryHook = vi.spyOn(costsApi, "useGetCostsByRegionsQuery");

    const ResourceSection = await RegionCostSection({ date: "2023-01-01" });
    renderWithProviders(ResourceSection);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByText("Server error occurred")).toBeInTheDocument();
    expect(resourceQueryHook).toHaveBeenCalledTimes(1);
  });
});
