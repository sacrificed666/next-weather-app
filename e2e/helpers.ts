import { expect, type Page } from "@playwright/test";

export const KYIV = "/en?lat=50.45&lon=30.52";

export const watchProblems = async (page: Page) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });
  page.on("pageerror", (error) => problems.push(error.message));
  await page.addInitScript(() => {
    const violations: string[] = [];
    Reflect.set(window, "policyViolations", violations);
    document.addEventListener("securitypolicyviolation", (event) => {
      violations.push(`${event.violatedDirective} ${event.blockedURI}`);
    });
  });
  return async () => {
    expect(problems).toEqual([]);
    expect(await page.evaluate(() => Reflect.get(window, "policyViolations"))).toEqual([]);
  };
};

export const openSettings = async (page: Page, name = "Settings") => {
  await page.getByRole("button", { name, exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
};
