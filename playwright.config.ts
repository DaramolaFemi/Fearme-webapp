import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: { channel: "chrome", baseURL: "http://127.0.0.1:4173" },
  webServer: {
    command: "npm run preview -- --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
