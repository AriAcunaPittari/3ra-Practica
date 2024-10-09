import { profile } from "console";
import { Locator, Page } from "playwright-core";
import { InfoNeeded } from "./InfoNeeded";

export class CheckPersonalInfoPage {
  page: Page;
  goToHome: string;
  profileBtn: Locator;
  locatorName: Locator;
  locatorLastName: Locator;
  locatorShippingTime: Locator;
  constructor(page: Page) {
    this.page = page;
    this.goToHome = process.env.URL_SARG!;
    this.profileBtn = this.page.getByRole("link", { name: " Perfil" });
    this.locatorName = this.page.getByText("Ariana"); //hc :c
    this.locatorLastName = this.page.getByText("acuña");
    this.locatorShippingTime = this.page.getByText("Jornada completa");
  }
  async goToProfile() {
    await this.page.goto(this.goToHome);
    await this.profileBtn.click();
  }
}
