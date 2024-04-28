import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // env: {
    //   localUrl: 'http://localhost:3000',
    //   previewUrl: 'XXXXX',
    //   prodUrl: 'XXXXX',
    // },
    baseUrl: 'http://localhost:3000'
  },
});
