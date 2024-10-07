import test, { chromium, expect } from "playwright/test";
import { POManager } from "../pom/poManager";

test.beforeAll(async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const pom = new POManager(page);
  const loginStorage = await pom.loginPage;
  await loginStorage.goToLogin();
  await loginStorage.loginStorage();
  await context.storageState({ path: "web/context/storageLogin.json" });
  await browser.close();
});

test.describe("TestCases for SudAmerikaArgentina", () => {
  test("Login", async ({ page }) => {
    const pom = new POManager(page);
    const login = await pom.loginPage;
    await login.goToLogin();
    await login.loginAccount();
    await expect(pom.loginPage.profileBtn).toBeVisible();

  });

});


test.describe("TestCases con logueo", () => {
  test.use({ storageState: "web/context/storageLogin.json" });
  test("Check Personal Info", async ({ page }) => {

  });
  test("Search Products", async ({ page }) => {

  });
  test("Check Cart validation", async ({ page }) => {

  });
  test("Add to Cart", async ({ page }) => {

  });
  test("Check Personal Info", async ({ page }) => {

  });
  test("LoginOut", async ({ page }) => {

  });
});