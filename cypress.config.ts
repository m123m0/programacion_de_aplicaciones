import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    screenshotOnRunFailure: true,
    video: false
  }
});
