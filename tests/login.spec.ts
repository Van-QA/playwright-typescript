import {expect} from '@playwright/test';
import {test} from '../config/fixtures'

import {user} from './testdata';

test('User can login and logout', async ({loginPage, homePage}) => {
  await homePage.visit();
  expect(await homePage.isLoggedIn()).toBeFalsy();
  await loginPage.login(user.email, user.password)


  await homePage.goToSettings();
  // await new NodePage(page).logout();
  //
  // const userIsLoggedOut = await new LogoutPage(page).userIsLoggedOut();
  // expect(userIsLoggedOut).toBeTruthy();
});

test('User can create node', async ({loginPage, homePage, nodePage}) => {
  expect(await homePage.isLoggedIn()).toBeTruthy()
  await nodePage.visit()
  await nodePage.createNewNode()


  await homePage.goToSettings();
  // await new NodePage(page).logout();
  //
  // const userIsLoggedOut = await new LogoutPage(page).userIsLoggedOut();
  // expect(userIsLoggedOut).toBeTruthy();
});
