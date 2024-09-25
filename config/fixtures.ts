import {Browser, BrowserContext} from "@playwright/test";
import base from "@playwright/test";
import {Constants} from './constants'
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {NodePage} from "../pages/nodePage";
import * as dotenv from 'dotenv';


export const TIMEOUT = Number(process.env.TIMEOUT) || Constants.TIMEOUT;
/**
 * this fixture is needed to record and attach videos / screenshot on failed tests when
 * tests are run in serial mode (i.e. browser is not closed between tests)
 */
export const test = base.extend<
  {
    loginPage: LoginPage
    homePage: HomePage
    nodePage: NodePage
    browserContext: BrowserContext; // Specify the correct type for the browser context
  }
>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  homePage: async ({page}, use) => {
    await use(new HomePage(page))
  },
  nodePage: async ({page}, use) => {
    await use(new NodePage(page))
  },
})

test.setTimeout(TIMEOUT)
dotenv.config({ path: './.env' }); // Adjust path if needed
