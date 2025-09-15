import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CostTrendSection from "../cost-trend-section";
import * as api from "@/lib/services/server/daily-cost-trend";
import { SuccessTypes } from "@/lib/types/response";

// Mock CostTrendAreaChart to capture what it receives
vi.mock("../cost-trend-area-chart", () => ({
  CostTrendAreaChart: ({ response }: any) => (
    <div>
      MockChart:{" "}
      {response.status === SuccessTypes.Success ? "success" : "error"}
    </div>
  ),
}));

describe("CostTrendSection", () => {
  it("renders chart with successful response", async () => {
    vi.spyOn(api, "fetchCostTrend").mockResolvedValueOnce({
      status: SuccessTypes.Success,
      data: { costTrend: [{ id: "1", date: "2025-08-26", totalCost: 100 }] },
    });

    render(await CostTrendSection());

    expect(screen.getByText(/MockChart: success/)).toBeInTheDocument();
  });

  it("renders chart with error response", async () => {
    vi.spyOn(api, "fetchCostTrend").mockResolvedValueOnce({
      status: SuccessTypes.Fail,
      message: "Something went wrong",
    });

    render(await CostTrendSection());

    expect(screen.getByText(/MockChart: error/)).toBeInTheDocument();
  });
});
