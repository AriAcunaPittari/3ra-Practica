import { Locator, Page } from "playwright";

export class LocatorsGroupPage {
  page: Page;
  btnConfirmar: Locator;
  labelTotal: Locator;
  labelFaltan: Locator;
  addItemOne: Locator;
  addItemTwo: Locator;
  addItemThree: Locator;
  constructor(page: Page) {
    this.page = page;
    this.btnConfirmar = this.page.getByRole("button", { name: "Confirmar" });
    this.addItemOne = this.page
      .locator("article")
      .filter({ hasText: "PLENYVegan Bar sabor" })
      .getByRole("button")
      .nth(1);
    this.addItemTwo = this.page
      .locator("article")
      .filter({ hasText: "ARROCITASGalletas Mini" })
      .getByRole("button")
      .nth(1);
    this.addItemThree = this.page
      .locator("article")
      .filter({ hasText: "LADDU BARBarrita de Cereal" })
      .getByRole("button")
      .nth(1);
    this.labelTotal = this.page.getByText("Total$");
    this.labelFaltan = this.page.getByText("Faltan$");
  }
  getContinueButton(page: Page) {
    return this.btnConfirmar;
  }

  getAddToCartButton(page: Page) {
    return {
      addItemOne: this.addItemOne,
      addItemTwo: this.addItemTwo,
      addItemThree: this.addItemThree,
    };
  }
  getLabelCart(page: Page) {
    return {
      labelFaltan: this.labelFaltan,
      labelTotal: this.labelTotal,
    };
  }
}
