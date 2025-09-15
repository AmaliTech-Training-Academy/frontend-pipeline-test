import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import * as errorHandlers from "@/utils/get-error-message";
import { useChartData } from "@/hooks/chat-data";
import { SuccessTypes } from "@/lib/types/response";

const mockDispatch = vi.fn();
vi.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("@/utils/get-error-message", () => ({
  getErrorMessage: vi.fn(),
}));

const mockApiSlice = {
  util: {
    updateQueryData: vi.fn((queryName, _arg, updater) => {
      const draft: any = {};
      updater(draft);
      return draft;
    }),
    upsertQueryData: vi.fn((queryName, args, data) => {
      return {
        type: "api/upsertQueryData",
        payload: {
          queryName,
          args,
          data,
        },
      };
    }),
  },
};

describe("useChartData", () => {
  it("initializes with given response and dispatches updateQueryData", () => {
    const response = {
      status: SuccessTypes.Success,
      message: "ok",
      data: { foo: 1 },
    };

    const { result } = renderHook(() =>
      useChartData({
        response,
        queryHook: vi.fn().mockReturnValue({}),
        queryName: "getTestData",
        apiSlice: mockApiSlice as any,
      })
    );

    expect(result.current.responseData).toEqual(response);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockApiSlice.util.upsertQueryData).toHaveBeenCalled();
  });

  it("sets responseData when queryHook returns data", () => {
    const newData = {
      status: SuccessTypes.Success,
      message: "new data",
      data: [],
    };
    const queryHook = vi.fn().mockReturnValue({
      data: newData,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const { result, rerender } = renderHook(() =>
      useChartData({
        response: newData,
        queryHook,
        queryName: "getTestData",
        apiSlice: mockApiSlice as any,
      })
    );

    rerender();

    expect(result.current.responseData).toEqual(newData);
  });

  it("handles error from queryHook", () => {
    const newData = {
      status: SuccessTypes.Success,
      message: "test data retrieved",
      data: [],
    };
    vi.spyOn(errorHandlers, "getErrorMessage").mockReturnValue(
      "Something went wrong"
    );
    const queryHook = vi.fn().mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: { status: 500 },
      refetch: vi.fn(),
    });

    const { result, rerender } = renderHook(() =>
      useChartData({
        response: newData,
        queryHook,
        queryName: "getTestData",
        apiSlice: mockApiSlice as any,
      })
    );

    rerender();

    expect(result.current.responseData).toEqual({
      status: SuccessTypes.Fail,
      message: "Something went wrong",
    });
  });

  it("handleRetry sets shouldFetch to true on first call", () => {
    const newData = {
      status: SuccessTypes.Success,
      message: "new data",
      data: [],
    };
    const refetch = vi.fn();
    const queryHook = vi.fn().mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch,
    });

    const { result } = renderHook(() =>
      useChartData({
        response: newData,
        queryHook,
        queryName: "getTestData",
        apiSlice: mockApiSlice as any,
      })
    );

    act(() => {
      result.current.handleRetry();
    });

    // First call just flips shouldFetch to true
    expect(refetch).not.toHaveBeenCalled();
  });

  it("handleRetry calls refetch when shouldFetch is already true", () => {
    const newData = {
      status: SuccessTypes.Success,
      message: "new data",
      data: [],
    };
    const refetch = vi.fn();
    const queryHook = vi.fn().mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch,
    });

    const { result } = renderHook(() =>
      useChartData({
        response: newData,
        queryHook,
        queryName: "getTestData",
        apiSlice: mockApiSlice as any,
      })
    );
    // first retry sets shouldFetch to true
    act(() => {
      result.current.handleRetry();
    });
    // second retry calls refetch
    act(() => {
      result.current.handleRetry();
    });
    expect(refetch).toHaveBeenCalled();
  });
});
