import { apiFetch } from "@/utils/fetch-helper";
import * as responseHandlers from "@/utils/response-handlers";

describe("apiFetch", () => {
  it("should call handleResponse on success", async () => {
    vi.spyOn(responseHandlers, "handleResponse");
    await apiFetch(`/costS/summary-metrics?asOfDate=2025-07-23`);
    expect(responseHandlers.handleResponse).toHaveBeenCalled();
    expect(responseHandlers.handleResponse).toHaveBeenCalledWith(
      expect.any(Response)
    );
  });

  it("should call handleError when fetch throws", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(() => {
      throw new Error("Network error");
    });
    vi.spyOn(responseHandlers, "handleError");
    await apiFetch("/test/fail");
    expect(responseHandlers.handleError).toHaveBeenCalled();
  });
});
