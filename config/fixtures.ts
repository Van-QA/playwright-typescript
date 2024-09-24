import {Browser, BrowserContext} from "@playwright/test";
import base from "@playwright/test";
import {Constants} from './constants'
import {CommonActions} from '../helpers/commonActions'
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {NodePage} from "../pages/nodePage";

export const TIMEOUT = Number(process.env.TIMEOUT) || Constants.TIMEOUT;
/**
 * this fixture is needed to record and attach videos / screenshot on failed tests when
 * tests are run in serial mode (i.e. browser is not closed between tests)
 */
export const test = base.extend<
  {
    commonActions: CommonActions
    loginPage: LoginPage
    homePage: HomePage
    nodePage: NodePage
    browserContext: BrowserContext; // Specify the correct type for the browser context
  }
>({
  commonActions: async ({page}, use, testInfo) => {
    await use(new CommonActions(page, testInfo))
  },
  loginPage: async ({page, commonActions}, use) => {
    await use(new LoginPage(page, commonActions))
  },
  homePage: async ({page, commonActions}, use) => {
    await use(new HomePage(page, commonActions))
  },
  nodePage: async ({page, commonActions}, use) => {
    await use(new NodePage(page, commonActions))
  },
})

test.setTimeout(TIMEOUT)