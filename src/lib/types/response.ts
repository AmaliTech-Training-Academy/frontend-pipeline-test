import { PageInfo } from "./pagination";

export type ErrorResponse = {
  status: SuccessTypes.Fail;
  message: string;
};

export type SuccessResponse<T> = {
  status: SuccessTypes.Success;
  message?: string;
  data: T;
};
export enum SuccessTypes {
  Success = "success",
  Fail = "fail",
}
export type PaginatedList<T> = {
  items: T[];
  pagination: PageInfo;
};
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
