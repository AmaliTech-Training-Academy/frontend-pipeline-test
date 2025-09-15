"use server";
import { apiFetch } from "@/utils/fetch-helper";
import { cookies } from "next/headers";
import { UserData } from "../types/user";

export async function serverLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("server-token");
}

export async function getUserInfo() {
  const cookieStore = await cookies();
  const serverToken = cookieStore.get("server-token")?.value || "";
  const userData = await apiFetch<UserData>(`/users/me`, {
    headers: {
      Cookie: `token=${serverToken}`,
    },
  });
  return userData;
}
