import { Locator, Page } from "playwright-core";

export class AddToCartPage {
  page: Page;
  pageCart: Locator;
  labelTotal: Locator;
  labelFaltan: Locator;
  maxUnits: Locator;
  addItemOne: Locator;
  addItemTwo: Locator;
  addItemThree: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageCart = this.page.getByRole("link", { name: " Carrito" });
    this.labelTotal = this.page.getByText("Total$");
    this.labelFaltan = this.page.getByText("Faltan$");
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
    this.maxUnits = this.page.getByText("*Alcanzaste el máximo de");
  }
  async goToCart() {
    await this.page.goto(process.env.URL_SARG!);
    await this.pageCart.click();
  }
  async addToCart() {
    let totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
    let total = Number(totalNumb.replace("$", "").trim());

    let faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
    let falta = Number(faltanNumb.replace("$", "").trim());


    while (falta > 0 || total < 125000 && total >= 100000) {
      {
        totalNumb = await this.labelTotal.locator("span").nth(1).innerText();
        total = Number(totalNumb.replace("$", "").trim());
        faltanNumb = await this.labelFaltan.locator("span").nth(1).innerText();
        falta = Number(faltanNumb.replace("$", "").trim());
        if (await this.maxUnits.isHidden()) {
          await this.addItemOne.click();
        }

        if (falta > 0 && total < 125000) {
          await this.addItemTwo.click();
          await this.addItemThree.click();
        }

        if (falta === 0 || total >= 100000 && total <= 125000) {
          break;
        }
      }
    }
  }
}
