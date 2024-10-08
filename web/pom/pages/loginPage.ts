import { Locator, Page } from "playwright-core";

export class LoginPage {
  page: Page;
  homePage: string;
  selectFacebook: Locator;
  selectIngresar: Locator;
  fbInputEmail: Locator;
  fbInputPass: Locator;
  fbLoginBtn: Locator;
  fbAcceptAccount: Locator;
  profileBtn: Locator;
  infoEmail: string;
  infoPass: string;
  constructor(page: Page) {
    this.page = page;
    this.homePage = process.env.URL_SARG!;
    this.selectFacebook = this.page.getByRole("button", { name: "Facebook" });
    this.selectIngresar = this.page.getByRole("link", { name: " Ingresar" });
    this.fbInputEmail = this.page.getByPlaceholder("Email or phone number");
    this.fbInputPass = this.page.getByPlaceholder("Password");
    this.fbLoginBtn = this.page.getByRole("button", { name: "Log In" });
    this.fbAcceptAccount = this.page.getByLabel("Continue as Ariana");
    this.profileBtn = this.page.getByRole("link", { name: " Perfil" });
    this.infoEmail = process.env.EMAIL_SARG!;
    this.infoPass = process.env.PASS_SARG!;
  }
  async goToLogin() {
    //await this.page.goto(this.homePage);
    await this.page.goto("https://www.sudamerikargentina.com.ar/");
  }
  async loginAccount() {
    await this.selectIngresar.click();
    await this.selectFacebook.click();
    await this.fbInputEmail.fill(this.infoEmail);
    await this.fbInputPass.fill(this.infoPass);
    await this.fbLoginBtn.click();
    await this.fbAcceptAccount.click();
    await this.profileBtn.waitFor({ state: "visible" });
  }
  async loginStorage() {
    
   // await this.page.getByRole("link", { name: " Ingresar" }).click();
    if (await this.selectIngresar.isVisible()) {
      await this.selectIngresar.click();
      await this.selectFacebook.click();
      await this.fbInputEmail.fill(this.infoEmail);
      await this.fbInputPass.fill(this.infoPass);
      await this.fbLoginBtn.click();
      await this.fbAcceptAccount.click();
      await this.page.waitForURL(
        "https://www.sudamerikargentina.com.ar/search?previousPage=login"
      );
      await this.profileBtn.waitFor({ state: "visible" });
      await this.page
      .context()
      .storageState({ path: "web/context/storageLogin.json" });
    }
  }
}
