import { Locator, Page } from "playwright-core";

export class SearchProductPage {
  page: Page;
  searchInput: Locator;
  selectSearch: Locator;
  addBtn: Locator;
  succsessPopUp: Locator;
  tableItems: Locator;
  rowItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.getByPlaceholder("Buscar productos");
    this.selectSearch = this.page.locator("p").locator("span");
    this.addBtn = this.page.locator("article").getByText("Agregar");
    this.succsessPopUp = this.page.getByText("Producto agregado con éxito");
    this.tableItems = this.page.locator(
      "div[class='w-full grid gap-4 grid-cols-2 sm:grid-cols-4']"
    );
    this.rowItems = this.tableItems.locator("a");
  }
  async goToSearch() {
    await this.page.goto(process.env.URL_SARG!);
  }
  async searchProduct() {
    await this.searchInput.fill(process.env.SEARCH_PRODUCT!);
    await this.searchInput.press("Enter");
  }
  async selectProducts(productos: string[]) {
    await this.page.waitForLoadState("networkidle");
    for (let i = 0; i < (await this.rowItems.count()); i++) {
      const productItem = await this.rowItems
        .locator("div[class='flex flex-col']")
        .locator("span")
        .nth(i);
      const product = await productItem.innerText();
      if (productos.includes(product)) {
        await productItem.click();
        await this.addBtn.click();

        if (i === 3) {
          break;
        }
      }
    }
  }
}
