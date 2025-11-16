import { defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // you can leave empty if no events are needed
      return config
    },
    specPattern: 'cypress/e2e/**/*.ts',
    env: {},
  },
})
