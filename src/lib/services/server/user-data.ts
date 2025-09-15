import { UserData } from "@/lib/types/user";
import { apiFetch } from "@/utils/fetch-helper";
import { ApiResponse, SuccessTypes } from "@/lib/types/response";
import { signIn, signOut } from "next-auth/react";
import { handleError, handleResponse } from "@/utils/response-handlers";
import { env } from "@/lib/env";
import { serverLogout } from "@/lib/actions/auth";
const USE_MOCK = false;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

export async function fetchUserData() {
  let res: ApiResponse<UserData>;

  if (USE_MOCK) {
    res = {
      status: SuccessTypes.Success,
      data: {
        user: {
          id: "1",
          username: "Patrick",
          fullName: "Patrick Smith",
          email: "patrick@gmail.com",
          role: "FinanceManager",
          profilePicture: null,
        },
      },
    };
  } else {
    res = await apiFetch<UserData>("/users/me");
  }

  if (res.status !== SuccessTypes.Success) {
    return {
      success: false,
      error: res.message || "Failed to set user data",
    };
  }

  const nextAuthRes = await signIn("credentials", {
    email: res.data.user.email,
    user: JSON.stringify(res.data.user),
    redirect: false,
  });

  if (nextAuthRes?.error) {
    return { success: false, error: nextAuthRes.error };
  }

  return { success: true };
}

interface LogoutData {
  logoutUrl: string;
}

export async function logOut() {
  let logOutData: ApiResponse<LogoutData>;
  try {
    const res = await fetch(
      `${env.public.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {
        credentials: "include",
      }
    );
    logOutData = await handleResponse<LogoutData>(res);
  } catch (error) {
    logOutData = handleError(error);
  }
  if (logOutData.status === SuccessTypes.Success) {
    window.open(logOutData.data.logoutUrl, "_blank", "noopener,noreferrer");
    return { success: true };
  } else {
    return { success: false, error: logOutData.message || "Failed to log out" };
  }
}

export async function handleSignOut() {
  const res = await logOut();
  if (res.success) {
    await serverLogout();
    await signOut({
      redirect: true,
      redirectTo: `${baseUrl}/login`,
    });
  }
}
