import test, { chromium, expect } from "playwright/test";
import { POManager } from "../pom/poManager";
import path from "path";

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
  test.skip("Login", async ({ page }) => {
    //OK!
    const pom = new POManager(page);
    const login = await pom.LoginPage;
    await login.goToLogin();
    await login.loginAccount();
    await expect(pom.LoginPage.profileBtn).toBeVisible();
  });
});

test.describe("TestCases with login for SudAmerikaArgentina", () => {
  test.use({ storageState: "web/context/storageLogin.json" });
  test("Check Personal Info", async ({ page }) => {
    //! No encuentra correctamente los textos - locator falla
    const pom = new POManager(page);
    const checkInfo = pom.checkPersonalInfoPage;
    const infoNeeded = pom.infoNeeded.getDataUser();
    await checkInfo.goToProfile();

    await expect(checkInfo.locatorName).toHaveText(infoNeeded.name);
    await expect(checkInfo.locatorLastName).toHaveText(infoNeeded.lastname);
    await expect(checkInfo.locatorShippingTime).toHaveText(infoNeeded.timeship);
  });
  test("Search Products", async ({ page }) => {
    //! OK Pero falta Mejorar
    const pom = new POManager(page);
    const searchProduct = pom.searchProductPage;
    await searchProduct.goToSearch();
    await searchProduct.searchProduct();
    await searchProduct.selectProducts();
    await expect(searchProduct.succsessPopUp).toHaveText(
      "Producto agregado con éxito"
    );
  });

  test("Add to Cart", async ({ page }) => {
    // Ok!

    const pom = new POManager(page);
    const addToCart = await pom.addToCartPage;
    const confirmar = await pom.getLocatorsGroupPage();
    await addToCart.goToCart();
    await addToCart.addToCart();
    await expect(confirmar.btnConfirmar).toBeEnabled();
    
  });
  test.only("Complete Order", async ({ page }) => {
    const pom = new POManager(page);
    const checkCartData = await pom.getConfirmCartInfoPage();
    const addToCart = await pom.addToCartPage; // Repito
    await addToCart.goToCart(); // Repito
    await checkCartData.checkCartData();
    await expect(checkCartData.totalCart).not.toBe(checkCartData.discountTotal);
    console.log("expect"+expect(checkCartData.totalCart).not.toBe(checkCartData.discountTotal));
    await expect(checkCartData.finishOrder).toBeEnabled();
  });
  test("Delete Items validation", async ({ page }) => {
    //  Negative - Preguntas sobre funciones.
    const pom = new POManager(page);
    const checkItems = pom.checkItemsPage;
    const confirmar = pom.getLocatorsGroupPage();
    await checkItems.goToCart();
    await checkItems.subtractItems();
    await checkItems.deleteItems();
    await expect(confirmar.btnConfirmar).toBeDisabled();
  });
  test("LoginOut", async ({ page }) => {
    // OK!
    const pom = new POManager(page);
    const navigate = await pom.LoginPage;
    const logout = await pom.logout;
    await page.goto("https://www.sudamerikargentina.com.ar");
    await logout.logoutProcess();
    await expect(navigate.selectIngresar).toBeVisible();
  });
});
