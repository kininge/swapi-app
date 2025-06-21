describe('Routing Behavior', () => {
  // check URL reroute
  it('redirects from / to /home', () => {
    cy.visit('/').wait(1000);

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      expect(renderedURL).to.include('/home');
    });
  });

  // check home route rendered
  it('renders character list on /home', () => {
    cy.visit('/home');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // character list component rendered
      cy.contains(/characters/i).should('be.visible');
    });
  });

  // check navigation from /home to /favorites
  it('navigated from /home to /favorites', () => {
    cy.visit('/home');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // find and click favorites route link from navigation bar
      cy.get('[data-testid="favorites-route-link"]')
        .should('exist')
        .click()
        .then(() => {
          cy.url().then((renderedURL: string) => {
            cy.log('Loaded URL after navigate to favorites: ', renderedURL); // GUI logs
            console.log('Loaded URL after navigate to favorites: ', renderedURL); // electron browser dev tool logs
            cy.task('logToTerminal', `Loaded URL after navigate to favorites: ', ${renderedURL}`); // terminal log

            expect(renderedURL).to.include('/favorites');
          });
        });
    });
  });

  // check favorites route rendered
  it('renders favorites page on /favorites', () => {
    cy.visit('/favorites');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // favorite characters component component rendered
      cy.contains(/favorite characters component/i).should('exist');
    });
  });

  // check navigation from /favorites to /home
  it('navigated from /favorites to /home', () => {
    cy.visit('/favorites');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // find and click favorites route link from navigation bar
      cy.get('[data-testid="home-route-link"]')
        .should('exist')
        .click()
        .then(() => {
          cy.url().then((renderedURL: string) => {
            cy.log('Loaded URL after navigate to home: ', renderedURL); // GUI logs
            console.log('Loaded URL after navigate to home: ', renderedURL); // electron browser dev tool logs
            cy.task('logToTerminal', `Loaded URL after navigate to home: ', ${renderedURL}`); // terminal log

            expect(renderedURL).to.include('/home');
          });
        });
    });
  });

  // check navigation from /favorites to /home on click app logo
  it('navigated from /favorites to /home on click app logo', () => {
    cy.visit('/favorites');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // find and click app logo route link from header
      cy.get('[data-testid="app-logo-home-route-link"]')
        .should('exist')
        .click()
        .then(() => {
          cy.url().then((renderedURL: string) => {
            cy.log('Loaded URL after navigate to home: ', renderedURL); // GUI logs
            console.log('Loaded URL after navigate to home: ', renderedURL); // electron browser dev tool logs
            cy.task('logToTerminal', `Loaded URL after navigate to home: ', ${renderedURL}`); // terminal log

            expect(renderedURL).to.include('/home');
          });
        });
    });
  });

  // page not found route rendered on /unknown route
  it('renders page not found page on /some-unknown-page', () => {
    cy.visit('/some-unknown-page');

    cy.url().then((renderedURL: string) => {
      cy.log('Loaded URL: ', renderedURL); // GUI logs
      console.log('Loaded URL: ', renderedURL); // electron browser dev tool logs
      cy.task('logToTerminal', `Loaded URL: ', ${renderedURL}`); // terminal log

      // favorite characters component component rendered
      cy.contains(/pagenotfound component/i).should('exist');
    });
  });
});
