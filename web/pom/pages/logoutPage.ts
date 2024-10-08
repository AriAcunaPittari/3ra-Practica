import { Locator, Page } from "playwright-core";

export class LogoutPage{
    page:Page;
    logoutBtn: Locator;
    profileBtn: Locator;
    constructor(page:Page){
        this.page = page;
        this.logoutBtn = this.page.locator('a').filter({ hasText: 'Cerrar sesión' });
        this.profileBtn = this.page.getByRole('link', { name: ' Perfil' });
    }
    async logoutProcess(){
        await this.profileBtn.click();
        await this.logoutBtn.click();
    }
}