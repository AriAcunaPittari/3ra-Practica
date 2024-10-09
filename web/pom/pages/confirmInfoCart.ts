import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class ConfirmCartInfoPage {
  page: Page;
  selectCoupon: Locator;
  confirmarBtn: Locator;
  selectPayment: Locator;
  selectCondition: Locator;
  finishOrder: Locator;
  textBoxInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectCoupon = this.page.getByLabel("BIENVENID@!!!5%");
    this.confirmarBtn = this.page.getByRole("button", { name: "Confirmar" });
    this.selectPayment = this.page.getByLabel("Transferencia Bancaria Previa");
    this.selectCondition = this.page.getByLabel("Responsable Inscripto");
    this.finishOrder = this.page.getByRole("button", { name: "Aceptar" });
    this.textBoxInfo = this.page.getByRole("textbox");
  }
  async checkCartData() {
    await this.confirmarBtn.click();
    await this.selectCondition.click();
    await this.selectPayment.click();
    await this.selectCoupon.click();
    await this.textBoxInfo.fill("."); //Requiere un "."
  }
}
