import { useAppDispatch } from "@/lib/hooks";
import {
  PaginationParams,
  UsePaginatedDataOptions,
} from "@/lib/types/pagination";
import { ApiResponse, PaginatedList, SuccessTypes } from "@/lib/types/response";
import { getErrorMessage } from "@/utils/get-error-message";
import { useCallback, useEffect, useState } from "react";

export function usePaginatedData<
  T,
  Q extends PaginationParams = PaginationParams,
>({
  response,
  queryHook,
  queryName,
  apiSlice,
  initialParams,
}: UsePaginatedDataOptions<T, Q>) {
  const [queryParams, setQueryParams] = useState<Q | undefined>(initialParams);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [responseData, setResponseData] =
    useState<ApiResponse<PaginatedList<T>>>(response);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, error, refetch } = queryHook(
    queryParams,
    {
      skip: !shouldFetch,
    }
  );

  useEffect(() => {
    if (response && initialParams) {
      setResponseData(response);
      dispatch(
        apiSlice.util.updateQueryData(queryName, initialParams, draft => {
          if (response.status === SuccessTypes.Success) {
            Object.assign(draft, response);
          }
        })
      );
    }
  }, [response, dispatch, queryName, apiSlice, initialParams]);

  useEffect(() => {
    if (data && data.status === SuccessTypes.Success) {
      setResponseData(data);
    } else if (error) {
      const err = getErrorMessage(error);
      setResponseData({
        status: SuccessTypes.Fail,
        message: err || "Failed to load data",
      });
    }
  }, [data, error]);

  const handleRetry = useCallback(() => {
    if (shouldFetch) {
      refetch();
    } else {
      setShouldFetch(true);
    }
  }, [shouldFetch, refetch]);

  const updateParams = useCallback((newParams: Q) => {
    setQueryParams(newParams);
    setShouldFetch(true);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (queryParams && typeof queryParams === "object") {
        const newParams = { ...queryParams, page } as Q;
        updateParams(newParams);
      }
    },
    [queryParams, updateParams]
  );

  return {
    responseData,
    isLoading: isLoading || isFetching,
    handleRetry,
    updateParams,
    goToPage,
    currentParams: queryParams,
  };
}
