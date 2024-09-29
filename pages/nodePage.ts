import type {Page} from 'playwright';
import {BasePage} from "./basePage";
import {expect} from "@playwright/test";

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
    await this.page.click('footer button:has-text("Create Node")');
  }

  async deleteNode() {
    // Expand and delete the first node
    await this.page.locator('button[aria-expanded="false"]').first().click()
    await this.page.locator('button:has(svg[data-icon="trash"])').first().click()
    await this.page.locator('button[data-testid="mui-button-destructive"]:has-text("Delete")').click()
  }

  async waitForFetchingNode() {
    await expect(this.page.locator('section:has-text("Fetching your Nodes")')).not.toBeVisible();

  }
}
