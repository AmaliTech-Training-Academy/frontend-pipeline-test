import { costsApi } from "../services/client/cost-api";
import { RTKQueryHook } from "./data-hooks";
import { ApiResponse, PaginatedList } from "./response";

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginationControlsProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

export interface PaginationState {
  [tableKey: string]: number;
}

export interface UsePaginatedDataOptions<T, Q extends PaginationParams> {
  response: ApiResponse<PaginatedList<T>>;
  queryHook: RTKQueryHook<Q | undefined, ApiResponse<PaginatedList<T>>>;
  queryName: keyof typeof costsApi.endpoints;
  apiSlice: typeof costsApi;
  initialParams?: Q;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}
