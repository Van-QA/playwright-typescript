import {expect} from '@playwright/test';
import {test} from '../config/fixtures'
import {writeToEnvFile} from '../helpers/fileHelpers'

test.skip('User can login and logout', async ({loginPage, homePage}) => {
  await homePage.visit();
  expect(await homePage.isLoggedIn()).toBeFalsy();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
});


test('Get API key from UI ', async ({apiKeysPage}) => {
  await apiKeysPage.visit()
  let responseJson = await apiKeysPage.waitForAPI('GET', '/project/secret', 200);

  writeToEnvFile('API_KEY', responseJson["0"].secret); // Join with comma
});

test('User can create node', async ({apiKeysPage, homePage, nodePage}) => {
  await nodePage.visit()
  expect(await homePage.isLoggedIn()).toBeTruthy()

  await apiKeysPage.waitForAPI('GET', '/project/nodes', 200);

  await nodePage.createNewNode()
  let responseJson = await apiKeysPage.waitForAPI('POST', '/project/nodes', 201);
  await expect(nodePage.page.locator('section:has-text("Fetching your Nodes")')).not.toBeVisible();

  // const keyValue = '48330e213e79477f84ce2c2f75b76dfc'
  const inputLocators = await nodePage.page.locator(`input[value*="${responseJson.key}"]`).all();

  const urlsArray = await Promise.all(
    inputLocators.map(async (inputLocator) => {
      return await inputLocator.getAttribute('value');
    })
  );

  // Write the array to the .env file as a single string
  writeToEnvFile('NODE_URLS', urlsArray.join(','));
})