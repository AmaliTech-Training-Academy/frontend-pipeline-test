import { costsApi } from "@/lib/services/client/cost-api";
import { ApiResponse } from "@/lib/types/response";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type RTKQueryHook<TArgs, TResult> = (
  args: TArgs,
  options?: {
    skip?: boolean;
    refetchOnMountOrArgChange?: boolean | number;
    refetchOnFocus?: boolean;
    refetchOnReconnect?: boolean;
    pollingInterval?: number;
  }
) => {
  data?: TResult;
  isLoading: boolean;
  isFetching: boolean;
  error?: FetchBaseQueryError | SerializedError;
  refetch: () => void;
};

export interface UseChartDataOptions<T, Q> {
  response: ApiResponse<T>;
  queryHook: RTKQueryHook<Q | undefined, ApiResponse<T>>;
  queryName: keyof typeof costsApi.endpoints;
  apiSlice: typeof costsApi;
}
