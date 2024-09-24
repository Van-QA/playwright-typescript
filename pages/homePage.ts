import type {Page} from 'playwright';
import {BasePage} from "./basePage";
import {CommonActions} from "../helpers/commonActions";

export class HomePage extends BasePage {
  constructor(
    public page: Page,
    readonly action: CommonActions
  ) {
    super(page, action)
  }

  async isLoggedIn() {
    return !this.page.url().includes('login');
  }

  async goToSettings() {
    await this.page.click('a[routerlink="/settings"]');
  }
}
