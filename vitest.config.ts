import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Vitest 3.2+ uses 'projects' for monorepo workspaces
    projects: [
      "apps/*/vitest.config.ts",
      "packages/*/vitest.config.ts",
    ],
  },
})
