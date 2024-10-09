import { Locator, Page } from "playwright-core";
import { LocatorsGroupPage } from "./locatorsGroup";

export class CheckItemsPage {
  page: Page;
  pageCart: Locator;
  emptyCart: Locator;
  subtractProduct: Locator;
  labelFaltan: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.pageCart = this.page.getByRole("link", { name: " Carrito" });
    this.emptyCart = this.page.getByRole('button', { name: 'Vaciar carrito' });
    this.subtractProduct = this.page.locator('article').filter({ hasText: 'ARROCITASGalletas Mini' }).getByRole('button').first();
    this.labelFaltan = this.page.getByText("Faltan$");
  }
  async goToCart() {
    await this.page.goto(process.env.URL_SARG!);
    await this.pageCart.click();
  }
  async subtractItems() {
    let faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    let falta = Number(faltanNumb.replace("$", "").trim());
    while(falta<0){
      await this.subtractProduct.click();
    }
    
  }

  async deleteItems() {
    
  }
}
