import { Locator, Page } from "playwright-core";

export class CheckItemsPage {
  page: Page;
  pageCart: Locator;
  emptyCart: Locator;
  subtractProductOne: Locator;
  subtractProductTwo: Locator;
  labelFaltan: Locator;
  labelTotal: Locator;
  confirmEmptyCart: Locator;
  cancelDeleteCart: Locator;
  emptyCartText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageCart = this.page.getByRole("link", { name: " Carrito" });
    this.emptyCart = this.page.getByRole("button", { name: "Vaciar carrito" });
    this.subtractProductOne = this.page.locator('article').filter({ hasText: 'SUDAMERIKChips de Chocolate' }).getByRole('button').first();
    this.subtractProductTwo = this.page.locator('article').filter({ hasText: 'LASFORCereales Almohaditas de' }).getByRole('button').first();
    this.labelFaltan = this.page.getByText("Faltan$");
    this.labelTotal = this.page.getByText("Total$");
    this.confirmEmptyCart = this.page.getByText("Vaciar", { exact: true });
    this.cancelDeleteCart = this.page.getByText("Cancelar");
    this.emptyCartText = this.page.getByText("No hay productos en tu carrito");
  }
  async goToCart() {
    await this.page.goto(process.env.URL_SARG!);
    await this.pageCart.click();
  }
  async subtractItems() {
    let totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
    let total = Number(totalNumb.replace("$", "").trim());
    let faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    let falta = Number(faltanNumb.replace("$", "").trim());

    while (total > falta) {
      await this.subtractProductOne.click();
      await this.subtractProductTwo.click();
      if (falta < total) {
        break;
      }
    }
  }
  async cancelDelete() {
    await this.emptyCart.click();
    await this.cancelDeleteCart.click();
  }

  async deleteItems() {
    await this.emptyCart.click();
    await this.confirmEmptyCart.click();
  }
}
