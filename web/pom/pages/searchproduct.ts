import { Page } from "playwright-core";

export class SearchProductPage {
    page: Page;
    constructor(page: Page){
        this.page = page;
        
    }
}