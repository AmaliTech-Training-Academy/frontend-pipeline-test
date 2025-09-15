import { z } from "zod";

// Public (build-time) schema
const publicSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_API_BASE_URL missing"),
  NEXT_PUBLIC_AUTHENTICATION_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_AUTHENTICATION_URL missing"),
  NEXT_PUBLIC_NODE_ENV: z.string().min(1, "NEXT_PUBLIC_NODE_ENV missing"),
  NEXT_PUBLIC_ENABLE_MSW: z.enum(["true", "false"]).optional(),
});

// Server-only (runtime) schema (secret optional at build time, enforced in production runtime)
const serverSchema = z.object({
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET missing").optional(),
  AUTH_TRUST_HOST: z.enum(["true", "false"]).optional(),
});

export const env = {
  // Values available on both client (because NEXT_PUBLIC_) & server
  public: publicSchema.parse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_AUTHENTICATION_URL: process.env.NEXT_PUBLIC_AUTHENTICATION_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_ENABLE_MSW: process.env.NEXT_PUBLIC_ENABLE_MSW,
  }),
  // Server-only values (wrap access so importing this file on client won't expose secret)
  server: (() => {
    if (typeof window !== "undefined") {
      return { AUTH_SECRET: undefined } as { AUTH_SECRET: string | undefined };
    }
    return serverSchema.parse({
      AUTH_SECRET: process.env.AUTH_SECRET,
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    });
  })(),
};

export const API_BASE_URL = env.public.NEXT_PUBLIC_API_BASE_URL;
export const ENABLE_MSW = env.public.NEXT_PUBLIC_ENABLE_MSW === "true";

export function requireAuthSecret() {
  if (!env.server.AUTH_SECRET) {
    throw new Error("AUTH_SECRET missing at runtime (required in production)");
  }
  return env.server.AUTH_SECRET;
}
