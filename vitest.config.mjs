import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["**/e2e/**", "**/node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
      exclude: [
        "node_modules/",
        "tests/e2e/",
        "**/*.config.*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./apps/web/src"),
      "@nbcon/config": path.resolve(__dirname, "./packages/config"),
      "@nbcon/ai-core": path.resolve(__dirname, "./packages/ai-core"),
    },
  },
});

