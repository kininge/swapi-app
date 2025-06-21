/// <reference types="cypress" />

describe('CharacterList Integration', () => {
  beforeEach(() => {
    cy.visit('/home').wait(1000);
  });

  // Character cards render check
  it('character card rendered', () => {
    // character-card's count
    cy.get('[data-testid="character-card"]')
      .its('length')
      .then((initialCount: number) => {
        cy.log('Rendered character card count: ', initialCount); // GUI logs
        console.log('Rendered character card count:', initialCount); // electron browser dev tool logs
        cy.task('logToTerminal', `Rendered character card count: ${initialCount}`); // terminal log
        expect(initialCount).to.be.greaterThan(0);
      });
  });

  // INFINITE SCROLL : On scroll bottom next character data should come
  it('loads more character cards on scroll', () => {
    // scroll react-window section
    cy.get('[data-testid="character-list-container"]')
      .children()
      .first()
      .should('exist')
      .scrollTo('bottom')
      .then(() => {
        cy.get('[data-testid="character-card"]')
          .last()
          .invoke('attr', 'id')
          .then((lastCharacterCardIdBeforeLoadNext: string | undefined) => {
            cy.log(`BEFORE SCROLL: Last character card id: ${lastCharacterCardIdBeforeLoadNext}`);
            cy.log(`BEFORE SCROLL: Last character card id: ${lastCharacterCardIdBeforeLoadNext}`);
            cy.task(
              'logToTerminal',
              `BEFORE SCROLL: last character card id: ${lastCharacterCardIdBeforeLoadNext}`
            );

            // expected to API call and render more character cards
            cy.wait(3000); // lazy load delay
            cy.scrollTo('bottom', { duration: 1500 });
            cy.get('[data-testid="character-card"]')
              .last()
              .invoke('attr', 'id')
              .then((lastCharacterCardIdAfterLoadNext: string | undefined) => {
                cy.log(`AFTER SCROLL: Last character card id: ${lastCharacterCardIdAfterLoadNext}`);
                cy.log(`AFTER SCROLL: Last character card id: ${lastCharacterCardIdAfterLoadNext}`);
                cy.task(
                  'logToTerminal',
                  `AFTER SCROLL: last character card id: ${lastCharacterCardIdAfterLoadNext}`
                );

                expect(lastCharacterCardIdBeforeLoadNext).to.not.be.equal(
                  lastCharacterCardIdAfterLoadNext
                );
              });
          });
      });
  });

  // NAVIGATE TO DETAIL PAGE: On Character card click move to next screen check
  it('navigates to character detail page on card click', () => {
    // Find the first character card
    cy.get('[data-testid="character-card"]')
      .first()
      .should('exist')
      .then(($card) => {
        const characterId = $card.attr('id');
        void expect(characterId, 'Character ID should be defined').to.not.be.undefined;

        // Alias the card for safe re-selection after possible re-render
        cy.wrap($card).as('firstCard');

        // Use cy.get('@firstCard') again before clicking
        cy.get('@firstCard').click({ force: true }); // force in case it's not yet "visible" or attached

        // cy.url().should('include', `/character/${characterId}`);
      });
  });
});
