import { Page } from "playwright-core";
import { LoginPage } from "./pages/loginPage";

export class POManager {
    page: Page;
    loginPage: LoginPage;
    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        
    }
    getloginPage() {
        return this.loginPage;
      }
}