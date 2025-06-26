describe('Page not found', () => {
  // page not found loaded
  it('shows 404 page for unknown route', () => {
    const unknownPath = '/this-page-does-not-exist';

    cy.visit(unknownPath, { failOnStatusCode: false });

    // Step 1: Validate 404 wrapper
    cy.get('[data-testid="page-not-found-page"]').should('exist');
    cy.log('✅ 404 page loaded');
    cy.task('logToTerminal', '✅ 404 page loaded');

    // Step 2: Check error message
    cy.contains(
      "This page doesn't exist. You’ve wandered into the Outer Rim, beyond the Republic’s maps."
    ).should('exist');
    cy.log('✅ 404 error message is visible');
    cy.task('logToTerminal', '✅ 404 error message is visible');

    // Step 3: Optional: Check presence of navigation or home button
    cy.get('[data-testid="go-to-home-button"]').should('exist');
    cy.log('✅ Home link/button found on 404 page');
    cy.task('logToTerminal', '✅ Home link/button found on 404 page');
  });

  // go to home page
  it('redirects to home page from 404 page when "Go to Home" button is clicked', () => {
    const unknownPath = '/non-existent-route';

    cy.visit(unknownPath, { failOnStatusCode: false });

    // Step 1: Confirm 404 page is visible
    cy.get('[data-testid="page-not-found-page"]').should('exist');
    cy.log('✅ 404 page displayed');

    // Step 2: Click on the "Go to Home" button
    cy.get('[data-testid="go-to-home-button"]').should('exist').click();
    cy.log('✅ Clicked on "Go to Home" button');

    // Step 3: Validate that user is redirected to Home
    cy.url().should('include', '/home');
    cy.get('[data-testid="home-page"]').should('exist');
    cy.log('✅ Redirected to Home Page');
    cy.task('logToTerminal', '✅ 404 → Home redirect successful');
  });
});
