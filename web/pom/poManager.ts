import { Page } from "playwright-core";
import { LoginPage } from "./pages/loginPage";
import { InfoNeeded } from "./pages/InfoNeeded";
import { CheckPersonalInfoPage } from "./pages/checkPersonalInfo";
import { LogoutPage } from "./pages/logoutPage";
import { SearchProductPage } from "./pages/searchproduct";

export class POManager {
  page: Page;
  LoginPage: LoginPage;
  checkPersonalInfo: CheckPersonalInfoPage;
  logout: LogoutPage;
  SearchProductPage: SearchProductPage;


  infoNeeded: InfoNeeded;
  constructor(page: Page) {
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.checkPersonalInfo = new CheckPersonalInfoPage(this.page);
    this.logout = new LogoutPage(this.page);
    this.SearchProductPage = new SearchProductPage(this.page);

    this.infoNeeded = new InfoNeeded(this.page);
  }
  getloginPage() {
    return this.LoginPage;
  }
  getcheckPersonalInfo() {
    return this.checkPersonalInfo;
  }

  getlogout() {
    return this.logout;
  }
  getsearchProductPage() {
    return this.SearchProductPage;
  }
  /*getUserData(){
        return this.infoNeeded;
    }*/
}
