![alt text](./playwright-logo.png)

# Moralis Automation Project

This project demonstrates automated testing of both the UI and API for Moralis Admin, using Playwright with TypeScript
and implements Page Object Model Pattern.

The testing covers two tasks, including both functional and automation tests. We also handle load testing using k6 as a
bonus.

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Project Overview

This project automates two main scenarios using Playwright and TypeScript:

- **UI Tests**:
    - Task 1: Create Node (`node.spec.ts`).
    - Task 2: Retrieve API Key (`apiKeys.spec.ts`).
- **API Tests**:
    - Task 1: RPC methods (`getRequests.test.ts`, `postRequests.test.ts`).
    - Task 2: `getWalletNFTs` (`getRequests.test.ts`).
- **Notes**:
    - The login test was temporarily skipped due to CAPTCHA. I used a manually
      captured [.auth file](./playwright/.auth/user.json) for login to workaround / bypass the captcha checks.
    - Added a test to delete a node to prevent more than two nodes from blocking create new
      Node. [User can delete Note](./tests-e2e/node.spec.ts)
    - [.env file](.env) File: Contains shared data for various tests to ensure consistency and facilitate easy
      configuration across different test cases, some tests will write / read data from this file (should be stored in
      secret later on).

---
### Task 1

#### UI Tests ([node.spec.ts](./tests-e2e/node.spec.ts))

- Create a Node in Moralis Admin.

#### API Tests

- `blockNumber` ([getRequests.test.ts](./tests-api/getRequests.test.ts))
- `getBlockByNumber`, `getTransactionByHash` ([postRequests.test.ts](./tests-api/postRequests.test.ts))
- Testing positive and negative flows.

---

### Task 2

#### UI Tests ([apiKeys.spec.ts](./tests-e2e/apiKeys.spec.ts))

- Retrieve an API Key from Moralis Admin.

#### API Tests ([getRequests.test.ts](./tests-api/getRequests.test.ts))

- Test the `getWalletNFTs` endpoint (positive and negative flows).

#### Bonus:

- Load testing the same API endpoints using **k6** (stored in a separated repo).

---

## Folder Structure

### 1. `config/`
- **`constants.ts`**: Stores constant values used throughout the project.
- **`fixtures.ts`**: Contains fixture data for use in the tests.

### 2. `data/`
- **`getRequestTestData.json`**: Test data specific to GET requests.
- **`postRequestTestData.json`**: Test data specific to POST requests.

### 3. `helpers/`
- **`apiHelpers.ts`**: Contains helper functions for API interactions.
- **`fileHelpers.ts`**: Provides utility functions for file handling.

### 4. `pages/`
- **`apiKeysPage.ts`**: Page object for the API Keys section of the Moralis Admin UI.
- **`basePage.ts`**: Base page object containing shared methods for page interactions.
- **`homePage.ts`**: Page object for the home page of the Admin UI.
- **`loginPage.ts`**: Page object for the login page of the Admin UI.
- **`nodePage.ts`**: Page object for managing nodes in the Admin UI.

### 5. `playwright/`
- **`.auth/`**: Contains the `.auth` file for session data.
- **`user.json`**: Stores user session details for reusability in tests.

### 6. `tests-api/`
- **`getRequests.test.ts`**: Contains tests for GET API requests such as `blockNumber` and `getWalletNFTs`.
- **`postRequests.test.ts`**: Contains tests for POST API requests like `getBlockByNumber` and `getTransactionByHash`.

### 7. `tests-e2e/`
- **`apiKeys.spec.ts`**: E2E test to retrieve an API Key from the Admin UI.
- **`node.spec.ts`**: E2E test to create and delete a Node in the Admin UI.

### 8. Root Files
- **`.env`**: Contains environment variables shared across different tests.
- **`playwright.config.ts`**: Playwright configuration file for setting up the test environment (e.g., browser, timeouts).

---

## Running the Tests

### Prerequisites
- Install Node.js.
- Install project dependencies:
  ```bash
  npm install


## Prerequisites

- Node.js (>=16.x)
- Git
- Playwright
- k6 (for load testing)
- A valid Moralis account should be provided under `.env` file

## Installation

If you want to run test locally, please follow these steps:

1. Clone this repository
2. Make sure you have `node.js` installed. If you don't, please
   visit [official website](https://nodejs.org/en/download/) for instructions
3. Run `npm install` to install node modules
4. That's it, now you can run tests with `npm run test`

If you want to run it in headed mode, then change configuration to `headless: true` in `playwright.config.js`

## Test Cases with Priorities and Automation Status:

Note: No need to automate all testcases

| ID  | Title                                                                                                  | Priority | Automated |
|-----|--------------------------------------------------------------------------------------------------------|----------|-----------|
| 1   | Verify user can create node with mainnet successfully                                                  | 1        | ✅         |
| 2   | Verify user can create node with testnet successfully                                                  | 1        | ✅         |
| 3   | Verify user is not able to create node without required fields (missing two fields, missing one field) | 2        | ❌         |
| 4   | Verify user can cancel create node by clicking on X button                                             | 3        | ❌         |
| 5   | Verify initial creating node popup                                                                     | 3        | ❌         |
| 6   | Verify creating node button after selecting protocol and network                                       | 2        | ✅         |
| 7   | Verify two copy link buttons on creating node popup                                                    | 1        | ❌         |
| 8   | Verify support button on creating node popup                                                           | 3        | ❌         |
| 9   | Verify nodes page with empty node                                                                      | 2        | ❌         |
| 10  | Verify nodes page with some nodes                                                                      | 1        | ✅         |
| 11  | Verify user can expand/collapse a node                                                                 | 2        | ✅         |
| 12  | Verify two copy link buttons on nodes page                                                             | 1        | ❌         |
| 13  | Verify user can view node API key and copy node API key on nodes page                                  | 1        | ❌         |
| 14  | Verify user can close view node API key popup by clicking on X button                                  | 3        | ❌         |
| 15  | Verify user can delete a node successfully                                                             | 1        | ✅         |
| 16  | Verify delete popup UI                                                                                 | 3        | ❌         |
| 17  | Verify user can cancel delete a node by clicking on X button                                           | 3        | ❌         |
| 18  | Verify two copy link button on deleting node popup                                                     | 1        | ❌         |
| 19  | Verify support button on deleting node popup                                                           | 3        | ❌         |
| TBU | ...                                                                                                    |          |           |
