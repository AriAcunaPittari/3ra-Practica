import { Locator, Page } from "playwright-core";

export class SearchProductPage {
    page: Page;
    searchInput: Locator;
    selectSearch: Locator;
    productVeganBar: Locator;
    productoGalletas: Locator;
    addBtn: Locator;
    succsessPopUp: Locator;
    constructor(page: Page){
        this.page = page;
        this.searchInput = this.page.getByPlaceholder('Buscar productos');
        this.selectSearch = this.page.locator("p").locator("span").nth(1);
        this.productVeganBar = this.page.locator('a').filter({ hasText: 'PLENYVegan Bar sabor' });
        this.productoGalletas = this.page.locator('a').filter({ hasText: 'ARROCITASGalletas Mini' });
        this.addBtn = this.page.locator('article').getByText('Agregar');
        this.succsessPopUp = this.page.getByText('Producto agregado con éxito');
        
    }
    async goToSearch(){
        await this.page.goto(process.env.URL_SARG!);
    }
    async searchProduct() {
        await this.searchInput.fill("Chocolate");
        const searchValue = await this.searchInput.inputValue();
        console.log("Valor del input: "+searchValue);
        const selectSearchText = await this.selectSearch.textContent();
        console.log("El texto seleccionado es:" + selectSearchText);
        await this.selectSearch.click();

      }
      async selectProducts(){
        await this.page.waitForLoadState("networkidle");
        await this.page.pause();
        await this.productVeganBar.click();
        await this.addBtn.click();
        await this.productoGalletas.click();
        await this.addBtn.click();
      }
}