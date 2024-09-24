import {expect, test} from '@playwright/test';
import {apiRequest, checkResponseJSON, checkResponseTime, validateSchema} from "../helpers/apiHelper";
import * as fs from 'fs';
import path from 'path';

// Load POST test data from JSON file
const postTestData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/postRequestTestData.json'), 'utf-8'));

postTestData.getBlockByNumber.forEach(testCase => {
  test(`POST API tests for block number - ${testCase.name}`, async ({request}) => {
    console.log(`Running: ${testCase.name}`);

    // Start the timer for response time measurement
    const startTime = Date.now();

    // Make the POST request using the helper
    const response = await apiRequest(request, testCase.method, testCase.url, testCase.expectedStatusCode, {
      headers: testCase.headers,
      body: testCase.body
    });

    // Measure response time
    const responseTime = Date.now() - startTime;

    // If it's a success (e.g., 200), proceed with further checks
    if (testCase.expectedStatusCode === 200) {
      // Check common properties
      checkResponseJSON(response, ['result']);

      // Validate response schema (for POST request)
      const schema = {
        type: 'object',
        properties: {
          result: {
            type: 'object',
            properties: {
              number: {type: 'string'} // Hexadecimal format
            },
            required: ['number']
          }
        },
        required: ['result']
      };
      validateSchema(response, schema);

      // Additional specific checks
      expect(response.result).toHaveProperty('number');
      expect(parseInt(response.result.number, 16)).toBeGreaterThan(0); // Ensure block number is valid
    }

    // Validate response time
    checkResponseTime(responseTime, 5000); // Example threshold
  });
});
