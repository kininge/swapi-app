describe('Top Navigation Bar Routes', () => {
  beforeEach(() => {
    cy.visit('/'); // or '/home' depending on your router default
  });

  it('navigates to home page via logo', () => {
    cy.get('[data-testid="app-logo-home-route-link"]').click();
    cy.url().should('include', '/home');
    cy.get('[data-testid="character-list-container"]').should('exist');
  });

  it('navigates to home page via Home link', () => {
    cy.get('[data-testid="home-route-link"]').click();
    cy.url().should('include', '/home');
    cy.get('[data-testid="character-list-container"]').should('exist');
  });

  it('navigates to search page via Search link', () => {
    cy.get('[data-testid="search-route-link"]').click();
    cy.url().should('include', '/search');
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('[data-testid="search-character-page"]').should('exist');
  });

  it('navigates to favorites page via Favorites link', () => {
    cy.get('[data-testid="favorites-route-link"]').click();
    cy.url().should('include', '/favorites');
    cy.get('[data-testid="favorite-list-page"]').should('exist');
  });

  it('navigates across all routes sequentially without reload', () => {
    cy.window().then((initialWindow) => {
      cy.get('[data-testid="search-route-link"]').click();
      cy.url().should('include', '/search');

      cy.get('[data-testid="favorites-route-link"]').click();
      cy.url().should('include', '/favorites');

      cy.get('[data-testid="home-route-link"]').click();
      cy.url().should('include', '/home');

      cy.get('[data-testid="app-logo-home-route-link"]').click();
      cy.url().should('include', '/home');

      // Optional: SPA navigation — window object should remain same
      cy.window().should('eq', initialWindow);
    });
  });
});
