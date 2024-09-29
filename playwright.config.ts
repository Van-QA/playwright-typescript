import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://admin.moralis.io', // default URL to run test

    // Browser options
    headless: true,

    // Artifacts
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
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
    // Sample project for other browsers
    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     storageState: 'playwright/.auth/user.json',
    //   },
    // },
    // {
    //   name: 'WebKit',
    //   use: {
    //     browserName: 'webkit',
    //     storageState: 'playwright/.auth/user.json',
    //   },
    // },
  ],
};

export default config;
