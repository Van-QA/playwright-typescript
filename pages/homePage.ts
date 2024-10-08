import type {Page} from 'playwright';
import {BasePage} from "./basePage";

export class HomePage extends BasePage {
  constructor(
    public page: Page,
  ) {
    super(page)
  }

  async isLoggedIn() {
    return !this.page.url().includes('login');
  }
}
