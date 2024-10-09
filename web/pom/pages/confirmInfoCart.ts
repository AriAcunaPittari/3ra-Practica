import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class ConfirmCartInfoPage{
    page:Page;
    selectCoupon: Locator;
    confirmarBtn: Locator;
    discountTotal: Locator;
    totalCart:Locator;
    selectPayment: Locator;
    selectCondition: Locator;
    finishOrder: Locator;
    constructor(page:Page){
        this.page = page;
        this.selectCoupon = this.page.getByLabel('BIENVENID@!!!5%');
        this.confirmarBtn = this.page.getByRole('button', { name: 'Confirmar' });
        //this.discountTotal = this.page.locator(".my-0 text-right text-2xl font-bold");
        this.discountTotal = this.page.locator(".flex.flex-col span").first();
        //this.totalCart = this.page.locator(".text-right text-gray-500 line-through");
        this.totalCart = this.page.locator(".flex.flex-col span").nth(1);
        this.selectPayment = this.page.getByLabel('Transferencia Bancaria Previa');
        this.selectCondition = this.page.getByLabel('Responsable Inscripto');
        this.finishOrder = this.page.getByRole('button', { name: 'Aceptar' });
    }
    async checkCartData(){
        await this.confirmarBtn.click();
        await this.selectCondition.click();
        await this.selectPayment.click();
        await this.selectCoupon.click();
        await this.discountTotal.waitFor({state:"hidden"});
        const discountNumb = await this.discountTotal.innerText();
        const totalConDescuento = Number(discountNumb.replace("$", "").trim());
        console.log("total con descuento:" + totalConDescuento)
        const totalNumb = await this.totalCart.innerText();
        const totalCompra = Number(totalNumb.replace("$", "").trim());
        console.log("total compra:" + totalCompra)
       
        
    }
}