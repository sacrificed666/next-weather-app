import { expect, type Page } from "@playwright/test";

export const KYIV = "/en?lat=50.45&lon=30.52";

export const MAC_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

export const endlessAnimations = (page: Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (animation) => animation.playState === "running" && animation.effect?.getTiming().iterations === Infinity,
        ).length,
  );

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

export const choosePreference = async (page: Page, label: string) => {
  const saved = page.waitForResponse(
    (response) => response.request().method() === "POST" && response.request().headers()["next-action"] !== undefined,
  );
  await page.getByText(label, { exact: true }).click();
  await saved;
};
