import { Locator, Page } from "playwright-core";

export class AddToCartPage {
  page: Page;
  pageCart: Locator;
  labelTotal: Locator;
  labelFaltan: Locator;
  maxUnits: Locator;
  tableProducts: Locator;
  rowProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageCart = this.page.getByRole("link", { name: " Carrito" });
    this.labelTotal = this.page.getByText("Total$");
    this.labelFaltan = this.page.getByText("Faltan$");
    this.maxUnits = this.page.getByText("*Alcanzaste el máximo de");
    this.tableProducts = this.page.getByText("3 productosSUDAMERIKChips de");
    this.rowProducts = this.tableProducts.locator("div").locator("button");
  }
  async goToCart() {
    await this.page.goto(process.env.URL_SARG!);
    await this.pageCart.click();
  }
  async addFromCart(productos: string[]) {
    let totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
    let total = Number(totalNumb.replace("$", "").trim());

    let faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    let falta = Number(faltanNumb.replace("$", "").trim());
    await this.page.pause();
    for (let i = 0; i < (await this.rowProducts.count()); i++) {
      let totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
      let total = Number(totalNumb.replace("$", "").trim());

      let faltanNumb = await this.labelFaltan
        .locator("span")
        .nth(1)
        .innerText();
      let falta = Number(faltanNumb.replace("$", "").trim());

      for (let i = 0; i < (await this.rowProducts.count()); i++) {
        const cartProductsLocator = await this.rowProducts
          .locator("svg")
          .nth(i);
        const cartProducts = await cartProductsLocator.innerText();
        while (falta > 0 || (total < 125000 && total >= 100000)) {
          {
            totalNumb = await this.labelTotal
              .locator("span")
              .nth(1)
              .innerText();
            total = Number(totalNumb.replace("$", "").trim());
            faltanNumb = await this.labelFaltan
              .locator("span")
              .nth(1)
              .innerText();
            falta = Number(faltanNumb.replace("$", "").trim());
            if (productos.includes(cartProducts)) {
              if (await this.maxUnits.isHidden()) {
                await cartProductsLocator.click();
              }

              if (falta > 0 && total < 125000) {
                await cartProductsLocator.click();
                await cartProductsLocator.click();
              }

              if (falta === 0 || (total >= 100000 && total <= 125000)) {
                break;
              }
            }
          }
        }
      }
    }
  }
}
