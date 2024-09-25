import {APIRequestContext, expect} from '@playwright/test';
import {Schema} from "node:inspector";

// Generic helper function for making API requests
export async function apiRequest(
  request: APIRequestContext,
  method: "GET" | "POST",
  url: string,
  expectedStatusCode: number,
  options: { headers?: object; body?: object } = {}
) {
  const {headers = {}, body} = options;

  // Set up common headers
  const requestOptions: any = {
    headers: {
      'accept': 'application/json',
      ...headers,
    }
  };

  // Add body only if it's a POST request
  requestOptions.data = method === 'POST' ? JSON.stringify(body) : undefined;

  // Execute the request dynamically
  const response = await request[method.toLowerCase()](url, requestOptions);

  // Ensure the response is successful
  if (!response.ok() && response.status() != expectedStatusCode) {
    throw new Error(`${method} Request failed with status ${response.status()}, Expected: ${expectedStatusCode}`);
  }

  // Log the response
  console.log('Response:', response);

  // Return the parsed response JSON
  return response.json();
}

// Utility function to check common response properties
export const checkResponseJSON = (response, expectedProperties = []) => {
  expect(response).toBeDefined();
  expectedProperties.forEach(prop => {
    expect(response).toHaveProperty(prop);
  });
};
// Utility function to check response time
export const checkResponseTime = (duration, maxDuration) => {
  expect(duration).toBeLessThan(maxDuration);
};

// Utility function to validate response schema
export function validateSchema(data: Record<string, any>, schema: Schema): boolean {
  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      const expectedType = schema[key];
      const actualType = typeof data[key];

      // Check if the property exists and matches the expected type
      if (!(key in data) || actualType !== expectedType) {
        console.error(`Invalid property: ${key}. Expected type ${expectedType} but got ${actualType}`);
        return false;
      }
    }
  }
  return true;
}