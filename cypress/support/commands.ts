/// <reference types="cypress" />

Cypress.Commands.add('prepareFavoriteCharacter', () => {
  cy.visit('/home');
  //step 0: home page detect
  cy.get('[data-testid="home-page"]').should('exist');
  cy.log(`home page rendered`); // GUI logs
  console.log(`home page rendered`); // electron browser dev tool logs
  cy.task('logToTerminal', `home page rendered`); // terminal log

  // step 1: detect character card loader
  cy.get('[data-testid="character-card-skeleton"]')
    .should('exist')
    .its('length')
    .then((loaderCount: number) => {
      cy.log('character card loader rendered: ', loaderCount); // GUI logs
      console.log('character card loader rendered:', loaderCount); // electron browser dev tool logs
      cy.task('logToTerminal', `character card loader rendered: ${loaderCount}`); // terminal log
    });

  // step 2: wait for loader to unmount
  cy.get('[data-testid="character-card-skeleton"]', { timeout: 10000 }).should('not.exist');
  cy.log('character card loader unmounted'); // GUI logs
  console.log('character card loader unmounted'); // electron browser dev tool logs
  cy.task('logToTerminal', 'character card loader unmounted'); // terminal log

  // step 3: character card should be available
  cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
  cy.log(`at least 1 character card rendered`); // GUI logs
  console.log(`at least 1 character card rendered`); // electron browser dev tool logs
  cy.task('logToTerminal', `at least 1 character card rendered`); // terminal log

  // step 4: if first character card is not favorite then do it
  cy.get('[data-testid="character-card"]')
    .first()
    .then(($card) => {
      const characterId: string | undefined = $card.attr('data-character-id');
      cy.log(`character card id: ${characterId}`);
      console.log(`character card id: ${characterId}`);
      cy.task('logToTerminal', `character card id: ${characterId}`);

      // step 5: if first card not favorite then make favorite
      cy.get('[data-testid="character-card"]')
        .first()
        .then(($firstCard) => {
          const cardId = $firstCard.attr('data-character-id');
          cy.wrap($firstCard)
            .find('[data-testid="favorite-button"]')
            .should('exist')
            .invoke('text')
            .then((beforeText: string) => {
              cy.log(`character favorite status: ${beforeText}`);
              console.log(`character favorite status: ${beforeText}`);
              cy.task('logToTerminal', `character favorite status: ${beforeText}`);

              if (beforeText.trim() === '♡') {
                cy.log(`card ${cardId} is not favorite, clicking now`);

                // BREAK THE CHAIN – safely re-query the button
                cy.get(`[data-character-id="${cardId}"]`)
                  .find('[data-testid="favorite-button"]')
                  .click({ force: true }); // force in case it's animated

                cy.log(`character ${cardId} marked as favorite`);
              }
            });
        });
    });
});

Cypress.Commands.add(
  'prepareCharacterDetailPage',
  (characterId: string = '1', shouldExist: boolean = true) => {
    cy.visit(`/character/${characterId.trim()}`);

    // step 1: get loader
    cy.get('[data-testid="character-detail-page-loading"]').should('exist');
    cy.log(`step 1: detail page loader visible`); // GUI logs
    console.log(`step 1: detail page loader visible`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 1: detail page loader visible`); // terminal log

    // step 2: wait for loader to remove
    cy.get('[data-testid="character-detail-page-loading"]').should('not.exist');
    cy.log(`step 2: detail page loader removed`); // GUI logs
    console.log(`step 2: detail page loader removed`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 2: detail page loader removed`); // terminal log

    // step 3: page load check
    if (shouldExist) {
      cy.get('[data-testid="character-detail-page"]', { timeout: 5000 }).should('exist');
      cy.log(`step 3: detail page loaded`); // GUI logs
      console.log(`step 3: detail page loaded`); // electron browser dev tool logs
      cy.task('logToTerminal', `step 3: detail page loaded`); // terminal log
    } else {
      cy.get('[data-testid="character-not-found"]', { timeout: 5000 }).should('exist');
      cy.log(`step 3: detail page not loaded`); // GUI logs
      console.log(`step 3: detail page not loaded`); // electron browser dev tool logs
      cy.task('logToTerminal', `step 3: detail page not loaded`); // terminal log
    }
  }
);
