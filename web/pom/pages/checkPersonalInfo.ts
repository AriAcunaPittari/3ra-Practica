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
    this.locatorName = this.page.getByText("Nombre").locator(".font-bold");
    this.locatorLastName = this.page
      .getByText("Apellido")
      .locator(".font-bold");
    this.locatorShippingTime = this.page
      .getByText("Horario de entrega")
      .locator(".font-bold");
  }
  async goToProfile() {
    await this.page.goto(this.goToHome);
    await this.profileBtn.click();
  }
}
