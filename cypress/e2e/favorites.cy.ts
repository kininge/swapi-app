/// <reference types="cypress" />

describe('Favorite Character card List Page', () => {
  // favorite character card list page lifecycle
  it('renders favorite-list-page correctly with character cards or empty state', () => {
    cy.visit('/favorites');

    // step 1: visit favorites route
    cy.get('[data-testid="favorite-list-page"]', { timeout: 10000 }).should('exist');
    cy.log('favorite list page loaded');
    console.log('favorite list page loaded');
    cy.task('logToTerminal', 'favorite list page loaded');

    // step 2: loader should not appear
    cy.get('[data-testid="character-card-skeleton"]').should('not.exist');

    // step 3: check either container or empty message exists
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="character-list-container"]').length > 0) {
        cy.get('[data-testid="character-list-container"]').within(() => {
          cy.get('[data-testid="character-card"]').then((cards) => {
            const lastCardId = cards.last().attr('data-character-id') || 'unknown';
            cy.log(`favorite character cards rendered: ${cards.length}`);
            console.log(`favorite character cards rendered: ${cards.length}`);
            cy.task('logToTerminal', `favorite character cards rendered: ${cards.length}`);

            cy.log(`last favorite card id: ${lastCardId}`);
            console.log(`last favorite card id: ${lastCardId}`);
            cy.task('logToTerminal', `last favorite card id: ${lastCardId}`);
          });
        });
      } else {
        cy.get('[data-testid="character-card-empty"]')
          .should('exist')
          .invoke('text')
          .then((text: string) => {
            cy.log(`favorite list empty message: ${text.trim()}`);
            console.log(`favorite list empty message: ${text.trim()}`);
            cy.task('logToTerminal', `favorite list empty message: ${text.trim()}`);
          });
      }
    });
  });

  // favorite character card toggle action
  it('toggles favorite character on favorite-list-page', () => {
    // ---- pre requisite ----
    cy.prepareFavoriteCharacter();

    // ---- test case stared ----
    cy.visit('/favorites');
    //step 1:  navigate to favorites page
    cy.get('[data-testid="favorite-list-page"]').should('exist');
    cy.log(`favorite page rendered`); // GUI logs
    console.log(`favorite page rendered`); // electron browser dev tool logs
    cy.task('logToTerminal', `favorite page rendered`); // terminal log

    // step 2: skeleton should not exist (cached data - no need loader)
    cy.get('[data-testid="character-card-skeleton"]').should('not.exist');
    cy.log(`character card list loader not rendered`); // GUI logs
    console.log(`character card list loader not rendered`); // electron browser dev tool logs
    cy.task('logToTerminal', `character card list loader not rendered`); // terminal log

    // step 3: at least 1 character card should rendered
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
    cy.log('at least 1 favorite character card found'); // GUI logs
    console.log('at least 1 favorite character card found'); // electron browser dev tool logs
    cy.task('logToTerminal', 'at least 1 favorite character card found'); // terminal log

    // step 4: click on favorite button and remove that card from favorites list
    cy.get('[data-testid="character-card"]')
      .first()
      .then(($card) => {
        const characterId: string | undefined = $card.attr('data-character-id');
        cy.log(`character card id: ${characterId}`); // GUI logs
        console.log(`character card id: ${characterId}`); // electron browser dev tool logs
        cy.task('logToTerminal', `character card id: ${characterId}`); // terminal log

        // favorite toggle button
        cy.get('[data-testid="favorite-button"]')
          .should('exist')
          .invoke('text')
          .then((beforeText: string) => {
            cy.log(`character favorite status: ${beforeText}`); // GUI logs
            console.log(`character favorite status: ${beforeText}`); // electron browser dev tool logs
            cy.task('logToTerminal', `character favorite status: ${beforeText}`); // terminal log

            expect(beforeText.trim()).equal('♥');
            cy.get('[data-testid="favorite-button"]').click();
            cy.wait(300);

            // step 5: validate removal of character card from favorites
            cy.get('[data-testid="character-card"], [data-testid="character-card-empty"]').then(
              ($elements) => {
                const cardEls = $elements.filter('[data-testid="character-card"]');
                const emptyEls = $elements.filter('[data-testid="character-card-empty"]');

                const remainingIds = cardEls
                  .toArray()
                  .map((el) => el.getAttribute('data-character-id') || 'unknown');

                cy.log(`remaining favorite character cards: ${remainingIds.length}`);
                console.log(`remaining favorite character cards: ${remainingIds.length}`);
                cy.task(
                  'logToTerminal',
                  `remaining favorite character cards: ${remainingIds.length}`
                );

                if (remainingIds.length > 0) {
                  // expect the removed character ID is not in the new list
                  expect(remainingIds).to.not.include(characterId);
                  cy.log(`character ID ${characterId} successfully removed from favorites`);
                  console.log(`character ID ${characterId} successfully removed from favorites`);
                  cy.task(
                    'logToTerminal',
                    `character ID ${characterId} successfully removed from favorites`
                  );
                } else {
                  // expect the empty state UI
                  expect(emptyEls.length).to.equal(1);
                  const emptyText = emptyEls.text().trim();

                  cy.log(`empty state shown: "${emptyText}"`);
                  console.log(`empty state shown: "${emptyText}"`);
                  cy.task('logToTerminal', `empty state shown: "${emptyText}"`);

                  expect(emptyText).to.eq("You haven't liked any characters yet!");
                }
              }
            );
          });
      });
  });

  // clear all favorite characters
  it('clears all favorite characters and shows empty message', () => {
    // ---- prerequisite ----
    cy.prepareFavoriteCharacter();

    // ---- test starts now ----
    cy.visit('/favorites');
    // step 1: navigate to favorite-list-page
    cy.get('[data-testid="favorite-list-page"]').should('exist');
    cy.log(`favorite list page rendered`);
    console.log(`favorite list page rendered`);
    cy.task('logToTerminal', `favorite list page rendered`);

    // step 2: skeleton should not exist
    cy.get('[data-testid="character-card-skeleton"]').should('not.exist');
    cy.log(`no loader in favorite list`);
    console.log(`no loader in favorite list`);
    cy.task('logToTerminal', `no loader in favorite list`);

    // step 3: get number of favorite characters
    cy.get('[data-testid="character-card"]').then(($initialCards) => {
      const total = $initialCards.length;
      cy.log(`initial favorite cards count: ${total}`);
      console.log(`initial favorite cards count: ${total}`);
      cy.task('logToTerminal', `initial favorite cards count: ${total}`);

      // step 4: unfavorite all favorite cards one by one
      cy.get('[data-testid="character-card"]').each(($card) => {
        const charId = $card.attr('data-character-id');
        cy.wrap($card)
          .find('[data-testid="favorite-button"]')
          .should('have.text', '♥')
          .click({ force: true });

        cy.log(`unfavorite card: ${charId}`);
        console.log(`unfavorite card: ${charId}`);
        cy.task('logToTerminal', `unfavorite card: ${charId}`);
      });

      // step 5: validate empty state appears after all unfavorite
      cy.get('[data-testid="character-card-empty"]', { timeout: 5000 })
        .should('exist')
        .invoke('text')
        .then((emptyText) => {
          const trimmed = emptyText.trim();
          cy.log(`empty state message: "${trimmed}"`);
          console.log(`empty state message: "${trimmed}"`);
          cy.task('logToTerminal', `empty state message: "${trimmed}"`);
          expect(trimmed).to.eq("You haven't liked any characters yet!");
        });
    });
  });

  // navigate to character detail page
  it('navigates to character detail from favorite-list-page', () => {
    // ---- prerequisite ----
    cy.prepareFavoriteCharacter();

    // ---- test case stared ----
    cy.visit('/favorites');
    //step 1:  navigate to favorites page
    cy.get('[data-testid="favorite-list-page"]').should('exist');
    cy.log(`favorite rendered`); // GUI logs
    console.log(`favorite rendered`); // electron browser dev tool logs
    cy.task('logToTerminal', `favorite rendered`); // terminal log

    // step 2: skeleton should not exist (cached data - no need loader)
    cy.get('[data-testid="character-card-skeleton"]').should('not.exist');
    cy.log(`character card list loader not rendered`); // GUI logs
    console.log(`character card list loader not rendered`); // electron browser dev tool logs
    cy.task('logToTerminal', `character card list loader not rendered`); // terminal log

    // step 3: at least 1 character card should rendered
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
    cy.log('at least 1 favorite character card found'); // GUI logs
    console.log('at least 1 favorite character card found'); // electron browser dev tool logs
    cy.task('logToTerminal', 'at least 1 favorite character card found'); // terminal log

    // step 4: click on character card and that should be navigate to character detail page
    cy.get('[data-testid="character-card"]')
      .first()
      .then(($card) => {
        const characterId: string | undefined = $card.attr('data-character-id');
        cy.log(`character card id: ${characterId}`); // GUI logs
        console.log(`character card id: ${characterId}`); // electron browser dev tool logs
        cy.task('logToTerminal', `character card id: ${characterId}`); // terminal log

        // step 5: click on character card
        expect(characterId).not.equals(undefined);
        cy.wrap($card).click();
        cy.log(`character card clicked: ${characterId}`); // GUI logs
        console.log(`character card clicked: ${characterId}`); // electron browser dev tool logs
        cy.task('logToTerminal', `character card clicked: ${characterId}`); // terminal log

        // step 6: check url is same as character id
        cy.url().then((url: string) => {
          cy.log(`app url: ${url}`); // GUI logs
          console.log(`app url: ${url}`); // electron browser dev tool logs
          cy.task('logToTerminal', `app url: ${url}`); // terminal log

          cy.url().should('include', characterId);
        });

        // step 7: check does character detail page rendered
        cy.get('[data-testid="character-detail-page"]', { timeout: 10000 }).should('exist');
        cy.log(`character detail page rendered`); // GUI logs
        console.log(`character detail page rendered`); // electron browser dev tool logs
        cy.task('logToTerminal', `character detail page rendered`); // terminal log
      });
  });
});
