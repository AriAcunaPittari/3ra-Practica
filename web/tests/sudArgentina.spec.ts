import test, { chromium, expect } from "playwright/test";
import { POManager } from "../pom/poManager";


test.beforeAll(async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const pom = new POManager(page);
  const loginStorage = await pom.LoginPage;
  await loginStorage.goToLogin();
  await loginStorage.loginStorage();
  await context.storageState({ path: "web/context/storageLogin.json" });
  await browser.close();
});


test.describe("TestCases for SudAmerikaArgentina", () => {
  test("Login", async ({ page }) => {
    const pom = new POManager(page);
    const login = await pom.LoginPage;
    await login.goToLogin();
    await login.loginAccount();
    await expect(pom.LoginPage.profileBtn).toBeVisible();

  });

});


test.describe("TestCases with login for SudAmerikaArgentina", () => {
 // test.use({ storageState: "web/context/storageLogin.json" });
  test.use({storageState:"web/context/storagelogin.json"});
  test("Check Personal Info", async ({ page }) => {
    const pom = new POManager(page);
    const checkInfo = pom.checkPersonalInfo;
    const userData = pom.infoNeeded;
    await checkInfo.goToProfile();
    await expect(pom.checkPersonalInfo.locatorName).toHaveText(userData.infoName);
    await expect(pom.checkPersonalInfo.locatorLastName).toHaveText(userData.infoLastName);
    await expect(pom.checkPersonalInfo.locatorShippingTime).toHaveText(userData.infoShippingTime);

  });
  test.only("Search Products", async ({ page }) => {
    const pom = new POManager(page);
    const searchProduct = pom.SearchProductPage;
    await searchProduct.goToSearch();
    await searchProduct.searchProduct();
    await searchProduct.selectProducts();
    await expect(searchProduct.succsessPopUp).toHaveText("Producto agregado con éxito");

  });
  test("Check Cart validation", async ({ page }) => {
    //Negative
    const pom = new POManager(page);


    
  });
  test("Add to Cart", async ({ page }) => {
    const pom = new POManager(page);



  });
  test("Complete Orders", async ({ page }) => {
    const pom = new POManager(page);



  });
  test("LoginOut", async ({ page }) => {
    const pom = new POManager(page);
    const navigate = await pom.LoginPage;
    const logout = await pom.logout;
    await page.goto("https://www.sudamerikargentina.com.ar");
    await logout.logoutProcess();
    await expect(navigate.selectIngresar).toBeVisible();

  });
});