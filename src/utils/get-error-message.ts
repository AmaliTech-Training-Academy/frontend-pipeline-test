import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export function getErrorMessage(error: FetchBaseQueryError | SerializedError) {
  if ("status" in error) {
    return typeof error.data === "string"
      ? error.data
      : JSON.stringify(error.data);
  }
  return error.message ?? "Unknown error";
}
