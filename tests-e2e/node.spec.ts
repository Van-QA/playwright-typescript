import {expect} from '@playwright/test';
import {test} from '../config/fixtures'
import {writeToEnvFile} from '../helpers/fileHelpers'

test.skip('User can login and logout', async ({loginPage, homePage}) => {
  await homePage.visit();
  expect(await homePage.isLoggedIn()).toBeFalsy();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
});

test('User can create node', async ({loginPage, homePage, nodePage}) => {
  expect(await homePage.isLoggedIn()).toBeTruthy()
  await nodePage.visit()
  await nodePage.createNewNode()


  writeToEnvFile('NODE_URL', "aaa");

  await homePage.goToSettings();
  // await new NodePage(page).logout();
  //
  // const userIsLoggedOut = await new LogoutPage(page).userIsLoggedOut();
  // expect(userIsLoggedOut).toBeTruthy();
})