import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules/**/*"],
    globals: true,
    environment: "puppeteer",
    globalSetup:
      "node_modules/vitest-environment-puppeteer/dist/global-init.js",
    reporters: ["default", "html"],
    outputFile: "./vitest-report/index.html",
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
  },
});
