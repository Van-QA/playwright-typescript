import { Page } from '@playwright/test'
import { CommonActions } from '../helpers/commonActions'
import { TIMEOUT } from '../config/fixtures'

export class BasePage {
  protected defaultUrl?: string; // Optional property for default URL

  constructor(
    protected readonly page: Page,
    readonly action: CommonActions,
  ) {

  }
  async visit(url = '') {
    // If no URL is provided, use the instance's default URL if it exists
    if (!url && this.defaultUrl) {
      url = this.defaultUrl;
    }
    await this.page.goto(url);
  }

  public getValue(key: string) {
    return this.action.getValue(key)
  }

  public setValue(key: string, value: string) {
    this.action.setValue(key, value)
  }

  async takeScreenshot(name: string = '') {
    await this.action.takeScreenshot(name)
  }

  //wait and find a specific element with its selector and return Visible
  async isElementVisible(selector: any) {
    let isVisible = true
    await this.page
      .waitForSelector(selector, { state: 'visible', timeout: TIMEOUT })
      .catch(() => {
        isVisible = false
      })
    return isVisible
  }
}
