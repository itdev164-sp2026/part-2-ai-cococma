import { test, expect } from "@playwright/test";

const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe("Authentication", () => {
  test("login page shows email input, password input, and submit button", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("successful login redirects to the overview page", async ({ page }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      test.skip(
        true,
        "TEST_USER_EMAIL and TEST_USER_PASSWORD must be set to run this test"
      );
    }

    await page.goto("/login");

    await page.getByLabel("Email").fill(TEST_EMAIL!);
    await page.getByLabel("Password").fill(TEST_PASSWORD!);
    await page.getByRole("button", { name: "Sign in" }).click();

    // Middleware redirects authenticated users to / after login
    await page.waitForURL("/", { timeout: 10_000 });
    await expect(page).toHaveURL("/");
  });

  test("sidebar shows Overview, Projects, and Settings links after login", async ({
    page,
  }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      test.skip(
        true,
        "TEST_USER_EMAIL and TEST_USER_PASSWORD must be set to run this test"
      );
    }

    await page.goto("/login");

    await page.getByLabel("Email").fill(TEST_EMAIL!);
    await page.getByLabel("Password").fill(TEST_PASSWORD!);
    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForURL("/", { timeout: 10_000 });

    const sidebar = page.locator('[data-sidebar="sidebar"]');
    await expect(sidebar.getByRole("link", { name: "Overview" })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: "Settings" })).toBeVisible();
  });
});
