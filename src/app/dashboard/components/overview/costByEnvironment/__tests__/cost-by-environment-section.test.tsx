import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CostByEnvironmentSection from "../cost-by-enironment-section";
import { renderWithProviders } from "@/utils/test-utils";
import * as costEnvironmentData from "@/lib/services/server/cost-by-environment";
import { SuccessTypes } from "@/lib/types/response";
describe("CostByEnvironmentSection", () => {
  it("renders component with successful response", async () => {
    const costEnvironmentSection = await CostByEnvironmentSection({
      date: "2023-01-01",
    });
    renderWithProviders(costEnvironmentSection);
    expect(screen.getByTestId("cost-by-environment-card")).toBeInTheDocument();
  });
  it("renders component with error response", async () => {
    vi.spyOn(
      costEnvironmentData,
      "fetchCostByEnvironment"
    ).mockResolvedValueOnce({
      status: SuccessTypes.Fail,
      message: "Failed to fetch data",
    });
    const costEnvironmentSection = await CostByEnvironmentSection({
      date: "2023-01-01",
    });
    renderWithProviders(costEnvironmentSection);
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });
});
