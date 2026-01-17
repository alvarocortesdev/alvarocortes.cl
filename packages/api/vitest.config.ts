import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "api",
    include: ["src/**/*.{test,spec}.ts"],
    globals: true,
  },
})
