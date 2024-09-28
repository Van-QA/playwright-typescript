import {test} from '../config/fixtures'
import {writeToEnvFile} from '../helpers/fileHelpers'


test('Get API key from UI', async ({apiKeysPage}) => {
  await apiKeysPage.visit()
  let responseJson = await apiKeysPage.waitForAPI('GET', '/project/secret', 200);

  writeToEnvFile('API_KEY', responseJson["0"].secret);
});
