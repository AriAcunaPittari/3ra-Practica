import { Page } from "playwright-core";

export class InfoNeeded {
  page: Page;
  infoEmail: string;
  infoPass: string;
  infoName: string;
  infoLastName: string;
  infoShippingTime: string;
  constructor(page: Page) {
    this.page = page;
    this.infoEmail = process.env.EMAIL_SARG!;
    this.infoPass = process.env.PASS_SARG!;
    this.infoName = process.env.NAME_SARG!;
    this.infoLastName = process.env.LAST_NAME_SARG!;
    this.infoShippingTime = process.env.STIME_SARG!;
  }
  getDatalogin() {
    return {
      email: this.infoEmail,
      password: this.infoPass,
    };
  }
  getDataUser() {
    return {
      name: this.infoName,
      lastname: this.infoLastName,
      timeship: this.infoShippingTime,
    };
  }
}
