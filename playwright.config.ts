import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Timeout
  timeout: 10000,

  use: {
    baseURL: 'https://admin.moralis.io', // default URL to run test

    // Browser options
    headless: true,

    // Context options
    viewport: {width: 1280, height: 720},

    // Artifacts
    screenshot: 'only-on-failure',
    trace: 'on',
  },
  reporter: [['html', {outputFolder: './playwright-report'}]],
  outputDir: './test-results',

  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'Firefox',
      use: {browserName: 'firefox'},
    },
    {
      name: 'WebKit',
      use: {browserName: 'webkit'},
    },
  ],
};

export default config;
