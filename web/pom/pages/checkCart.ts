import { Locator, Page } from "playwright-core";

export class CheckCartPage{
    page:Page;
    pageCart: Locator;
    labelTotal: Locator;
    labelFaltan: Locator;
    btnConfirmar: Locator;

    constructor(page:Page){
        this.page = page;
        this.pageCart = this.page.getByRole('link', { name: ' Carrito' });
        this.labelTotal = this.page.getByText('Total$');
        this.labelFaltan = this.page.getByText('Faltan$');
        this.btnConfirmar = this.page.getByRole('button', { name: 'Confirmar' });
    }
    async goToCart(){
        await this.pageCart.click();
    }
    async verifyTopAmount(){
        const totalnumb = await this.labelTotal.locator("span").locator(".pb-2 text-lg font-bold").innerText();
        const total = Number(totalnumb.replace("$", "").trim());
    }
}