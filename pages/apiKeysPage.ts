import type {Page} from 'playwright';
import {BasePage} from "./basePage";

export class ApiKeysPage extends BasePage {
  constructor(
    public page: Page,
  ) {
    super(page)
    this.defaultUrl = '/api-keys'
  }

}
