import {expect} from '@playwright/test';
import {test} from '../config/fixtures'
import {writeToEnvFile} from '../helpers/fileHelpers'

test.skip('User can login and logout', async ({loginPage, homePage}) => {
  await homePage.visit();
  expect(await homePage.isLoggedIn()).toBeFalsy();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
});


test('Get API key from UI', async ({apiKeysPage}) => {
  await apiKeysPage.visit()
  let responseJson = await apiKeysPage.waitForAPI('GET', '/project/secret', 200);

  writeToEnvFile('API_KEY', responseJson["0"].secret);
});


test('User can create node', async ({apiKeysPage, nodePage}) => {
  await nodePage.visit()
  await nodePage.waitForAPI('GET', '/project/nodes', 200);
  await nodePage.createNewNode()

  let responseJson = await apiKeysPage.waitForAPI('POST', '/project/nodes', 201);
  await expect(nodePage.page.locator('section:has-text("Fetching your Nodes")')).not.toBeVisible();

  const nodeUrlInputFields = await nodePage.page.locator(`input[value*="${responseJson.key}"]`).all();

  const urlsArray = await Promise.all(
    nodeUrlInputFields.map(async (inputLocator) => {
      return await inputLocator.getAttribute('value');
    })
  );
  // Write the NODE URL array to the .env file as a single string
  writeToEnvFile('NODE_URLS', urlsArray.join(','));
})

test('User can delete node', async ({homePage, nodePage}, testInfo) => {
  await nodePage.visit()
  let responseJson = await nodePage.waitForAPI('GET', '/project/nodes', 200);

  let nodeCount = responseJson.length
  // Check if the length of the response is greater than or equal to 2
  if (nodeCount >= 1) {
    // Delete the first node
    await nodePage.page.locator('button[aria-expanded="false"]').first().click()
    await nodePage.page.locator('button:has(svg[data-icon="trash"])').first().click()
    await nodePage.page.locator('button[data-testid="mui-button-destructive"]:has-text("Delete")').click()
    responseJson = await nodePage.waitForAPI('GET', '/project/nodes', 200);
    expect(responseJson.length).toEqual(nodeCount - 1)
  } else {
    testInfo.skip(true, 'Skipping because no node available');
    testInfo.status = "skipped"
  }
})
