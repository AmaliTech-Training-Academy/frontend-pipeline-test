"use server";
import { ApiResponse } from "@/lib/types/response";
import { handleError, handleResponse } from "./response-handlers";
import { API_BASE_URL } from "@/lib/env";
import { cookies } from "next/headers";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const cookieStore = await cookies();
    const serverToken = cookieStore.get("server-token")?.value || "";
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Cookie: `token=${serverToken}`,
      },
      ...options,
    });
    return await handleResponse<T>(res);
  } catch (error) {
    return handleError(error);
  }
}
