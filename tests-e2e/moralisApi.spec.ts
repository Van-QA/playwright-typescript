import {expect, test} from '@playwright/test';
import {
  apiRequest,
  checkResponseJSON,
  checkResponseTime,
  validateSchema,
} from "../helpers/apiHelpers";

// Test for GET request to fetch latest block number
test('Fetch latest block number using GET request from Moralis API', async ({ request }) => {
  const url = 'https://deep-index.moralis.io/api/v2.2/latestBlockNumber/eth';
  const headers = {
    // 'X-API-Key': user.api_key // Use environment variable for security
  };

  // Start the timer for response time measurement
  const startTime = Date.now();

  // Make the GET request using the helper
  const response = await apiRequest(request, 'GET', url, undefined, {headers});

  // Measure response time
  const responseTime = Date.now() - startTime;

  // Check common properties
  checkResponseJSON(response);

  // Validate response time
  checkResponseTime(responseTime, 5000); // Example threshold
});

// Test for POST request to fetch latest block using eth_getBlockByNumber
test('Fetch latest block using eth_getBlockByNumber POST request', async ({ request }) => {
  const url = 'https://site1.moralis-nodes.com/base/1a2161b4019040ad85f4fcdf7bcf8edf';
  const headers = {
    'content-type': 'application/json'
  };

  const body = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_getBlockByNumber",
    "params": [
      "latest",
      true
    ]
  };

  // Start the timer for response time measurement
  const startTime = Date.now();

  // Make the POST request using the helper
  const response = await apiRequest(request, 'POST', url, undefined, {headers, body});

  // Measure response time
  const responseTime = Date.now() - startTime;

  // Check common properties
  checkResponseJSON(response, ['result']);

  // Validate response time
  // checkResponseTime(responseTime, 5000); // Example threshold

  // Validate response schema
  const schema = {
    type: 'object',
    properties: {
      result: {
        type: 'object',
        properties: {
          number: { type: 'string' } // Hexadecimal format
        },
        required: ['number']
      }
    },
    required: ['result']
  };
  validateSchema(response, schema);

  // Additional specific checks
  expect(response.result).toHaveProperty('number'); // Ensure that 'number' exists in the block data
  expect(parseInt(response.result.number, 16)).toBeGreaterThan(0); // Ensure block number is valid and convert from hex
});
