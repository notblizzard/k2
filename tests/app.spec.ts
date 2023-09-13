import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5010");
  await expect(page).toHaveTitle(/k2/);
});
