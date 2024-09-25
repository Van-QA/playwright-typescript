import {expect, test} from '@playwright/test';
import {apiRequest, checkResponseJSON, checkResponseTime, validateSchema} from "../helpers/apiHelpers";
import * as fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

// Load POST test data from JSON file
const postRequestTestData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/postRequestTestData.json'), 'utf-8'));

dotenv.config({path: './.env'});
const urls = process.env.NODE_URLS.split(','); // Split the string back into an array

urls.forEach((nodeUrl) => {
  postRequestTestData.getBlockByNumber.forEach(testCase => {
    test(`POST API tests for block number - ${testCase.name} - ${nodeUrl}`, async ({request}) => {
      console.log(`Running: ${testCase.name}`);

      // Start the timer for response time measurement
      const startTime = Date.now();

      // Make the POST request using the helper
      const response = await apiRequest(request, testCase.method, nodeUrl || testCase.url, testCase.expectedStatusCode, {
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

        expect(response.result).toHaveProperty('number');
        expect(parseInt(response.result.number, 16)).toBeGreaterThan(0); // Ensure block number is valid
      }

      // Validate response time
      checkResponseTime(responseTime, 5000); // Example threshold
    });
  });
})
