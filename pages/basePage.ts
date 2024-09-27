import {expect, Page} from '@playwright/test'
import {TIMEOUT} from '../config/fixtures'

export class BasePage {
  protected defaultUrl?: string; // Optional property for default URL

  constructor(
    protected readonly page: Page,
  ) {
  }

  async visit(url = '') {
    // If no URL is provided, use the instance's default URL if it exists
    if (!url && this.defaultUrl) {
      url = this.defaultUrl;
    }
    await this.page.goto(url);
  }

  //wait and find a specific element with its selector and return Visible
  async isElementVisible(selector: any) {
    let isVisible = true
    await this.page
      .waitForSelector(selector, {state: 'visible', timeout: TIMEOUT})
      .catch(() => {
        isVisible = false
      })
    return isVisible
  }

  async selectRandomOption(locator, skipFirst = false) {
    const options = await locator.locator('option').all();

    let randomIndex;


    if (skipFirst && options.length > 1) {
      // Skip the first option and select randomly from the rest
      randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
    } else if (!skipFirst || options.length === 1) {
      // Select randomly from all options, including the first one
      randomIndex = Math.floor(Math.random() * options.length);
    } else {
      throw new Error(`Insufficient options available in the dropdown: ${options.length}`);
    }

    const randomValue = await options[randomIndex].getAttribute('value');
    await locator.selectOption(randomValue);
  }

  /**
   * @param method
   * @param endUrlPath
   * @param expectedStatusCode
   */
  async waitForAPI(method: string, endUrlPath: string, expectedStatusCode: number = 200) {
    let response = await this.page.waitForResponse(
      response => response.url().endsWith(endUrlPath) && response.request().method() === method
    );
    // expect created successfully
    expect(response.status()).toBe(expectedStatusCode);
    return await response.json()
  }
}
