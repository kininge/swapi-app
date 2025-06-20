module.exports = {
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('task', {
        logToTerminal(message) {
          console.log('[CYPRESS LOG]:', message);
          return null;
        },
      });
    },
  },
};
