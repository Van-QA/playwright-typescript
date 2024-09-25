import type {Page} from 'playwright';
import {BasePage} from "./basePage";

export class NodePage extends BasePage {
  constructor(
    public page: Page,
  ) {
    super(page)
    this.defaultUrl = '/nodes'
  }

  async createNewNode() {
    await this.page.getByTestId('test-CreateSteam').first().click();
    await this.selectRandomOption(this.page.locator("#select-protoccol"), true);
    await this.selectRandomOption(this.page.locator("#select-network"), true);
    await this.page.click('button:has-text("Create Node")');
  }
  async logout() {
    await this.page.click('.btn-outline-danger');
  }
}
