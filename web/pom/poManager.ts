import { Page } from "playwright-core";
import { LoginPage } from "./pages/loginPage";
import { InfoNeeded } from "./pages/InfoNeeded";
import { CheckPersonalInfoPage } from "./pages/checkPersonalInfo";
import { LogoutPage } from "./pages/logoutPage";
import { SearchProductPage } from "./pages/searchproduct";
import { CheckItemsPage } from "./pages/deleteItems";
import { AddToCartPage } from "./pages/addToCart";
import { LocatorsGroupPage } from "./pages/locatorsGroup";
import { ConfirmCartInfoPage } from "./pages/confirmInfoCart";

export class POManager {
  page: Page;
  LoginPage: LoginPage;
  checkPersonalInfoPage: CheckPersonalInfoPage;
  logout: LogoutPage;
  searchProductPage: SearchProductPage;
  checkItemsPage: CheckItemsPage;
  addToCartPage: AddToCartPage;
  locatorsGroupPage: LocatorsGroupPage;
  confirmCartInfoPage: ConfirmCartInfoPage;

  infoNeeded: InfoNeeded;
  constructor(page: Page) {
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.checkPersonalInfoPage = new CheckPersonalInfoPage(this.page);
    this.logout = new LogoutPage(this.page);
    this.searchProductPage = new SearchProductPage(this.page);
    this.checkItemsPage = new CheckItemsPage(this.page);
    this.addToCartPage = new AddToCartPage(this.page);
    this.locatorsGroupPage = new LocatorsGroupPage(this.page);
    this.confirmCartInfoPage = new ConfirmCartInfoPage(this.page);
    this.infoNeeded = new InfoNeeded(this.page);
  }
  getloginPage() {
    return this.LoginPage;
  }
  getCheckPersonalInfoPage() {
    return this.checkPersonalInfoPage;
  }
  getlogout() {
    return this.logout;
  }
  getsearchProductPage() {
    return this.searchProductPage;
  }
  getcheckItemsPage() {
    return this.checkItemsPage;
  }
  getaddToCartPage() {
    return this.addToCartPage;
  }
  getLocatorsGroupPage() {
    return this.locatorsGroupPage;
  }
  getConfirmCartInfoPage() {
    return this.confirmCartInfoPage;
  }
  getUserData() {
    return this.infoNeeded;
  }
}
