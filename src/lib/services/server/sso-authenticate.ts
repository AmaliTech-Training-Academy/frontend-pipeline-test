import { apiFetch } from "@/utils/fetch-helper";

export const ssoAuthenticate = async (email: string) => {
  return await apiFetch<{ authorizationEndpoint?: string; ssoUrl?: string }>(
    `/auth/sso-login`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
