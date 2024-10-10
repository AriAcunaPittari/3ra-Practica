import { Locator, Page } from "playwright-core";

export class AddToCartPage {
  page: Page;
  pageCart: Locator;
  labelTotal: Locator;
  labelFaltan: Locator;
  maxUnits: Locator;
  tableProducts: Locator;
  rowProducts: Locator;
  addItemOne: Locator;
  addItemTwo: Locator;
  addItemThree: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageCart = this.page.getByRole("link", { name: " Carrito" });
    this.labelTotal = this.page.getByText("Total$");
    this.labelFaltan = this.page.getByText("Faltan$");
    this.maxUnits = this.page.getByText("*Alcanzaste el máximo de");
    this.tableProducts = this.page
      .locator(
        'section[class="lg:grid lg:grid-cols-12 lg:flex-row lg:items-start"]'
      )
      .nth(1);
    this.rowProducts = this.tableProducts
      .locator("section[class='w-full relative flex justify-center'] ")
      .locator("article");
    this.addItemOne = this.page
      .locator("article")
      .filter({ hasText: "SUDAMERIKChips de Chocolate" })
      .getByRole("button")
      .nth(1);
    this.addItemTwo = this.page
      .locator("article")
      .filter({ hasText: "LASFORCereales Almohaditas de" })
      .getByRole("button")
      .nth(1);
    this.addItemThree = this.page
      .locator("article")
      .filter({ hasText: "INTEGRABarra Mani con" })
      .getByRole("button")
      .nth(1);
  }
  async goToCart() {
    await this.page.goto(process.env.URL_SARG!);
    await this.pageCart.click();
  }
  async addFromCart() {
    let totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
    let total = Number(totalNumb.replace("$", "").trim());

    let faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    let falta = Number(faltanNumb.replace("$", "").trim());

    totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
    total = Number(totalNumb.replace("$", "").trim());

    faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    falta = Number(faltanNumb.replace("$", "").trim());
    while (falta > 0) {
      {
        totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
        total = Number(totalNumb.replace("$", "").trim());

        faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
        falta = Number(faltanNumb.replace("$", "").trim());

        if (falta > 0) {
          await this.addItemOne.click();
        }
        if (falta > 0) {
          await this.addItemThree.click();

          if (falta > 0) {
            await this.addItemTwo.click();
          }

          if (falta === 0) {
            break;
          }
        }
      }
    }
  }
}
