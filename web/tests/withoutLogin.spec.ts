import test, {  expect } from "playwright/test";
import { POManager } from "../pom/poManager";

test.describe("TestCases for SudAmerikaArgentina", () => {
  test("Login", async ({ page }) => {
    //OK!
    const pom = new POManager(page);
    const login = await pom.LoginPage;
    await login.goToLogin();
    await login.loginAccount();
    await expect(pom.LoginPage.profileBtn).toBeVisible();
  });
});
