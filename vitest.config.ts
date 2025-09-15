import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    env: {
      NEXT_PUBLIC_API_BASE_URL: "http://localhost:3000/api/v1",
      NEXT_PUBLIC_AUTHENTICATION_URL: "http://localhost:3000/api/v1/users/me",
      NEXT_PUBLIC_NODE_ENV: "test",
      NEXT_PUBLIC_ENABLE_MSW: "true",
    },
    coverage: {
      // provider: "v8", //  default is "v8"
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      include: [
        "src/app/**/*.{ts,tsx}",
        "src/components/**/*.{ts,tsx}",
        "src/lib/**/*.{ts,tsx}",
        "src/utils/**/*.{ts,tsx}",
        "src/hooks/**/*.{ts,tsx}",
      ],
      exclude: [
        "src/app/api/**/*",
        "src/components/ui/**/*.{ts,tsx}",
        "src/lib/dummy-data/**/*",
        "src/lib/enums/**/*",
        "src/lib/types/**/*",
        "src/utils/constants/**/*",
      ],
    },
  },
});
