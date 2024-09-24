import type {Page} from 'playwright';
import {CommonActions} from "../helpers/commonActions";
import {BasePage} from "./basePage";

export class NodePage extends BasePage {
  constructor(
    public page: Page,
    readonly action: CommonActions
  ) {
    super(page, action)
    this.defaultUrl = '/nodes'
  }

  async createNewNode() {
    await this.page.getByTestId('test-CreateSteam').first().click()
    await this.page.locator("#select-protoccol").selectOption("Base")
    await this.page.locator("#select-network").selectOption("Mainnet")
    await this.page.click('button:has-text("Create Node")')
    // this.page.get
  }
  async logout() {
    await this.page.click('.btn-outline-danger');
  }
}
