import {APIRequestContext, test} from '@playwright/test';
import {apiRequest, checkResponseJSON, checkResponseTime} from "../helpers/apiHelpers";
import * as fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

// Load GET test data from JSON file
const getRequestTestData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/getRequestTestData.json'), 'utf-8'));
dotenv.config({path: './.env'});

async function testGetRequest(testCase, request: APIRequestContext) {
  console.log(`Running: ${testCase.name}`);

  // Start the timer for response time measurement
  const startTime = Date.now();

  // Make the GET request using the helper
  const response = await apiRequest(request, testCase.method, testCase.url, testCase.expectedStatusCode, {
    headers: {
      ...testCase.headers, // Spread existing headers
      ...(testCase.expectedStatusCode === 200 && process.env.X_API_KEY ? {'X-API-Key': process.env.X_API_KEY} : {}), // Use environment variable if conditions are met
    }
  });

  // Measure response time
  const responseTime = Date.now() - startTime;

  // If it's a success (e.g., 200), proceed with further checks
  if (testCase.expectedStatusCode === 200) {
    // Check common properties
    checkResponseJSON(response);

    // // Validate response time
    checkResponseTime(responseTime, 5000);
  }
}

getRequestTestData.getBlockNumberTestCases.forEach(testCase => {
  test(`Get Block Number - ${testCase.name}`, async ({request}) => {
    await testGetRequest(testCase, request);

  });
});

getRequestTestData.getNFTDetailsTestCases.forEach(testCase => {
  test(`Get NFTs by wallet - ${testCase.name}`, async ({request}) => {
    await testGetRequest(testCase, request);
  });
});
