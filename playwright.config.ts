import { defineConfig, devices } from "@playwright/test";

const CI = Boolean(process.env.CI);
const PORT = 3100;
const API_PORT = 4020;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    locale: "en-GB",
    timezoneId: "Europe/Kyiv",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", testIgnore: /lighthouse/, use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testIgnore: /lighthouse/, use: { ...devices["Pixel 7"] } },
    { name: "lighthouse", testMatch: /lighthouse\.spec\.ts/, dependencies: ["desktop", "mobile"] },
  ],
  webServer: [
    {
      command: "node e2e/openweather-api.ts",
      url: `http://127.0.0.1:${API_PORT}/health`,
      env: { E2E_API_PORT: String(API_PORT), E2E_API_KEY: "e2e-key" },
      reuseExistingServer: !CI,
    },
    {
      command: `npm run build && npm run start -- --port ${PORT}`,
      url: `${BASE_URL}/en`,
      env: {
        OPENWEATHERMAP_API_KEY: "e2e-key",
        OPENWEATHERMAP_API_URL: `http://127.0.0.1:${API_PORT}`,
        SITE_URL: BASE_URL,
        NEXT_TELEMETRY_DISABLED: "1",
      },
      timeout: 300_000,
      reuseExistingServer: !CI,
    },
  ],
});
