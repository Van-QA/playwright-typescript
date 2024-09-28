import {APIRequestContext, expect, test} from '@playwright/test';
import {apiRequest, checkResponseJSON, checkResponseTime, validateSchema} from "../helpers/apiHelpers";
import * as fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

// Load POST test data from JSON file
const postRequestTestData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/postRequestTestData.json'), 'utf-8'));

dotenv.config({path: './.env'});
const urls = process.env.NODE_URLS.split(','); // Split the string back into an array
let transaction_hash = "";

async function testPostRequest(testCase, request: APIRequestContext, nodeUrl) {
  console.log(`Running: ${testCase.name}`);

  // Start the timer for response time measurement
  const startTime = Date.now();

  // Make the POST request using the helper
  const responseJson = await apiRequest(request, testCase.method, nodeUrl || testCase.url, testCase.expectedStatusCode, {
    headers: testCase.headers,
    body: testCase.body
  });

  // Measure response time
  const responseTime = Date.now() - startTime;

  // Validate response time
  checkResponseTime(responseTime, 5000); // Example threshold

  // If it's a success (e.g., 200), proceed with further checks
  if (testCase.expectedStatusCode === 200) {
    // Check common properties
    checkResponseJSON(responseJson, ['result']);

    // Validate response schema (for POST request)
    validateSchema(responseJson);
  }
  return responseJson
}

urls.forEach((nodeUrl) => {
  postRequestTestData.getBlockByNumber.forEach(testCase => {
    test(`Get Block By Number - ${testCase.name} - ${nodeUrl}`, async ({request}) => {
      let responseJson = await testPostRequest(testCase, request, nodeUrl);
      if (testCase.expectedStatusCode === 200) {
        expect(responseJson.result).toHaveProperty('number');
        expect(parseInt(responseJson.result.number, 16)).toBeGreaterThan(0); // Ensure block number is valid
        transaction_hash = responseJson.result.hash // Share hash value for the next testcase, if failed, the next testcase will use JSON value bydefault
      }
    });
  });

  postRequestTestData.getTransactionByHash.forEach(testCase => {
    test(`Get Transaction By Hash - ${testCase.name} - ${nodeUrl}`, async ({request}) => {
      testCase.body = {
        ...testCase.body,
        "params": transaction_hash ? [transaction_hash] : testCase.body?.params // Prioritize transaction_hash if defined
      };
      await testPostRequest(testCase, request, nodeUrl);
    });
  });
})
