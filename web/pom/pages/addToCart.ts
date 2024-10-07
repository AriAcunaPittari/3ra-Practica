import { Page } from "playwright-core";

export class AddToCartPage {
    page: Page;
    constructor(page: Page){
        this.page = page;
        
    }
}