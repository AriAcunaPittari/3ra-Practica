import { Page } from "playwright-core";

export class ConfirmCartInfoPage{
    page:Page;
    constructor(page:Page){
        this.page = page;

    }
}