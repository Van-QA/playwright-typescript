import type { Page } from 'playwright';
import {BasePage} from "./basePage";
import {CommonActions} from "./commonActions";
import path from 'path';
import {request} from "@playwright/test";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


export class LoginPage extends BasePage {
    constructor(
        public page: Page,
        readonly action: CommonActions
    ) {
        super(page, action)
    }

    async login(email: string, password: string) {

        await this.page.getByTestId('test-email').locator('input').type(email)
        await this.page.getByTestId('test-password').locator('input').type(password)
        // await this.page.keyboard.press('Enter'); // Simulate pressing Enter after filling
        await this.page.getByTestId('test-checkbox-label').click()
        // await this.page.getByTestId('test-button').click()
        // await this.page.getByTestId('test-button').click()
        await this.page.context().storageState({ path: authFile });
    }
}
