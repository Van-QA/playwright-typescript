import {expect} from '@playwright/test';
import {test} from '../config/fixtures'
import {writeToEnvFile} from '../helpers/fileHelpers'

// Suggestion
// test.describe.configure({ mode: 'serial' });

test.skip('User can login', async ({loginPage, homePage}) => {
  await homePage.visit();
  expect(await homePage.isLoggedIn()).toBeFalsy();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
});

test('User can delete node', async ({nodePage}, testInfo) => {
  await nodePage.visit()
  let responseJson = await nodePage.waitForAPI('GET', '/project/nodes', 200);

  let nodeCount = responseJson.length
  // Check if the length of the response is greater than or equal to 2
  if (nodeCount >= 1) {
    await nodePage.deleteNode()
    responseJson = await nodePage.waitForAPI('GET', '/project/nodes', 200);
    expect(responseJson.length).toEqual(nodeCount - 1)
  } else {
    testInfo.skip(true, 'Skipping because no node available');
    testInfo.status = "skipped"
  }
})

test('User can create node', async ({nodePage}) => {
  await nodePage.visit()
  await nodePage.waitForAPI('GET', '/project/nodes', 200);
  await nodePage.createNewNode()

  let responseJson = await nodePage.waitForAPI('POST', '/project/nodes', 201);
  await nodePage.waitForFetchingNode()

  const nodeUrlInputFields = await nodePage.page.locator(`input[value*="${responseJson.key}"]`).all();

  const urlsArray = await Promise.all(
    nodeUrlInputFields.map(async (inputLocator) => {
      return await inputLocator.getAttribute('value');
    })
  );
  // Write the NODE URL array to the .env file as a single string
  writeToEnvFile('NODE_URLS', urlsArray.join(','));
})


