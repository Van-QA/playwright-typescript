import {expect, test} from '@playwright/test';
import {apiRequest, checkResponseJSON, checkResponseTime} from "../helpers/apiHelper";
import * as fs from 'fs';
import path from 'path';

// Load GET test data from JSON file
const getTestData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/getRequestTestData.json'), 'utf-8'));

getTestData.getBlockNumberTestCases.forEach(testCase => {
  test(`GET API tests for block number: ${testCase.name}`, async ({request}) => {
    console.log(`Running: ${testCase.name}`);

    // Start the timer for response time measurement
    const startTime = Date.now();

    // Make the GET request using the helper
    const response = await apiRequest(request, testCase.method, testCase.url, testCase.expectedStatusCode, {headers: testCase.headers});

    // Measure response time
    const responseTime = Date.now() - startTime;

    // If it's a success (e.g., 200), proceed with further checks
    if (testCase.expectedStatusCode === 200) {
      // Check common properties
      checkResponseJSON(response);

      // // Validate response time
      checkResponseTime(responseTime, 5000);
    }
  });
});
