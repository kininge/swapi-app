/// <reference types="cypress" />

describe('Character List Page', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  // character card loader visible --> then character card loads or error message render
  it('check character list life cycle', () => {
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

    // step 3: Validate result - either empty state or cards
    cy.get('[data-testid="character-list-container"]').within(() => {
      cy.get('[data-testid="character-card"]').then((cards) => {
        if (cards.length > 0) {
          const lastCardId = cards.last().attr('data-character-id') || 'unknown';
          cy.log(`character cards rendered: ${cards.length}`); // GUI logs
          console.log(`character cards rendered: ${cards.length}`); // electron browser dev tool logs
          cy.task('logToTerminal', `character cards rendered: ${cards.length}`); // terminal log

          cy.log(`last rendered character cards id: ${lastCardId}`); // GUI logs
          console.log(`last rendered character cards id: ${lastCardId}`); // electron browser dev tool logs
          cy.task('logToTerminal', `last rendered character cards id: ${lastCardId}`); // terminal log
        } else {
          cy.get('[data-testid="character-card-empty"]')
            .should('exist')
            .invoke('text')
            .then((text: string) => {
              cy.log(`character cards error rendered: ${text.trim()}`); // GUI logs
              console.log(`character cards error rendered: ${text.trim()}`); // electron browser dev tool logs
              cy.task('logToTerminal', `character cards error rendered: ${text.trim()}`); // terminal log
            });
        }
      });
    });
  });

  // character card content rendered check
  it('verifies character card properties render', () => {
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

    // step 4: take first character card and check all properties in it
    cy.get('[data-testid="character-card"]')
      .first()
      .within(() => {
        // 1. character Name
        cy.get('[data-testid="character-name"]')
          .should('exist')
          .invoke('text')
          .then((name: string) => {
            cy.log(`character name: ${name}`); // GUI logs
            console.log(`character name: ${name}`); // electron browser dev tool logs
            cy.task('logToTerminal', `character name: ${name}`); // terminal log
          });

        // 2. gender Info
        cy.get('[data-testid="character-gender"]')
          .should('exist')
          .invoke('text')
          .then((gender: string) => {
            cy.log(`character gender: ${gender}`); // GUI logs
            console.log(`character gender: ${gender}`); // electron browser dev tool logs
            cy.task('logToTerminal', `character gender: ${gender}`); // terminal log
          });

        // 3. favorite toggle button
        cy.get('[data-testid="favorite-button"]')
          .should('exist')
          .invoke('text')
          .then((favorite: string) => {
            cy.log(`character favorite status: ${favorite}`); // GUI logs
            console.log(`character favorite status: ${favorite}`); // electron browser dev tool logs
            cy.task('logToTerminal', `character favorite status: ${favorite}`); // terminal log
          });

        // 4. planet info (lazy loaded)
        cy.log(`waiting for planet info to load`); // GUI logs
        console.log(`waiting for planet info to load`); // electron browser dev tool logs
        cy.task('logToTerminal', `waiting for planet info to load`); // terminal log

        cy.get('[data-testid="planet-info-loading"]', { timeout: 10000 }).should('not.exist');

        // now check for either valid planet or error

        cy.get('[data-testid="planet-info"]').then((planet) => {
          if (planet) {
            cy.log(`planet info to load`); // GUI logs
            console.log(`planet info to load`); // electron browser dev tool logs
            cy.task('logToTerminal', `planet info to load`); // terminal log

            // Optional: Planet Image
            cy.get('[data-testid="planet-image"]').then((img) => {
              if (img.length > 0) {
                cy.get('[data-testid="planet-image"]').then(($img) => {
                  const src = $img.attr('src');
                  const alt = $img.attr('alt');

                  cy.log(`planet image load: ${alt} - ${src}`); // GUI logs
                  console.log(`planet image load: ${alt} - ${src}`); // electron browser dev tool logs
                  cy.task('logToTerminal', `planet image load: ${alt} - ${src}`); // terminal log
                });
              } else {
                cy.log(`planet image not load`); // GUI logs
                console.log(`planet image not load`); // electron browser dev tool logs
                cy.task('logToTerminal', `planet image not load`); // terminal log
              }
            });

            // Planet Name
            cy.get('[data-testid="planet-name"]')
              .should('exist')
              .invoke('text')
              .then((text: string) => {
                cy.log(`planet name: ${text}`); // GUI logs
                console.log(`planet name: ${text}`); // electron browser dev tool logs
                cy.task('logToTerminal', `planet name: ${text}`); // terminal log
              });

            // Planet Climate
            cy.get('[data-testid="planet-climate"]')
              .should('exist')
              .invoke('text')
              .then((text) => {
                cy.log(`planet climate: ${text}`); // GUI logs
                console.log(`planet climate: ${text}`); // electron browser dev tool logs
                cy.task('logToTerminal', `planet climate: ${text}`); // terminal log
              });

            // Planet Population
            cy.get('[data-testid="planet-population"]')
              .should('exist')
              .invoke('text')
              .then((text) => {
                cy.log(`planet population: ${text}`); // GUI logs
                console.log(`planet population: ${text}`); // electron browser dev tool logs
                cy.task('logToTerminal', `planet population: ${text}`); // terminal log
              });
          } else {
            cy.get('[data-testid="planet-info-error"]').should('exist');

            cy.log(`planet failed to load`); // GUI logs
            console.log(`planet failed to load`); // electron browser dev tool logs
            cy.task('logToTerminal', `planet failed to load`); // terminal log
          }
        });
      });
  });

  // favorite button action check
  it('verifies favorite button action', () => {
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

    // step 4: take first character card and check all properties in it
    cy.get('[data-testid="character-card"]')
      .first()
      .within(() => {
        // favorite toggle button
        cy.get('[data-testid="favorite-button"]')
          .should('exist')
          .invoke('text')
          .then((beforeText: string) => {
            cy.log(`BEFORE: character favorite status: ${beforeText}`); // GUI logs
            console.log(`BEFORE: character favorite status: ${beforeText}`); // electron browser dev tool logs
            cy.task('logToTerminal', `BEFORE: character favorite status: ${beforeText}`); // terminal log

            // toggle 1: click favorite button
            cy.get('[data-testid="favorite-button"]').click();
            cy.wait(300);

            cy.get('[data-testid="favorite-button"]')
              .invoke('text')
              .then((afterText: string) => {
                cy.log(`CLICK 1: character favorite status: ${afterText}`); // GUI logs
                console.log(`CLICK 1: character favorite status: ${afterText}`); // electron browser dev tool logs
                cy.task('logToTerminal', `CLICK 1: character favorite status: ${afterText}`); // terminal log

                // toggle 2: click favorite button
                cy.get('[data-testid="favorite-button"]').click();
                cy.wait(300);

                cy.get('[data-testid="favorite-button"]')
                  .invoke('text')
                  .then((finalText: string) => {
                    cy.log(`CLICK 2: character favorite status: ${finalText}`); // GUI logs
                    console.log(`CLICK 2: character favorite status: ${finalText}`); // electron browser dev tool logs
                    cy.task('logToTerminal', `CLICK 2: character favorite status: ${finalText}`); // terminal log

                    // final check
                    expect(finalText.trim()).to.eq(beforeText.trim());
                  });
              });
          });
      });
  });

  // on click character card land on character detail page
  it('character card navigation to character-detail-page', () => {
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

    // step 4: take first character card and check all properties in it
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

  // on character card list scroll more character cards should be rendered
  it('character list scroll loads more data', () => {
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

    // step 3: ensure at least 1 character card is rendered
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
    cy.log(`at least 1 character card rendered`); // GUI logs
    console.log(`at least 1 character card rendered`); // electron browser dev tool logs
    cy.task('logToTerminal', `at least 1 character card rendered`); // terminal log

    // step 4: capture last visible card ID before scroll
    cy.get('[data-testid="character-card"]')
      .last()
      .invoke('attr', 'data-character-id')
      .then((lastIdBefore) => {
        cy.log(`BEFORE SCROLL: last character card id: ${lastIdBefore}`);
        console.log(`BEFORE SCROLL: last character card id: ${lastIdBefore}`);
        cy.task('logToTerminal', `BEFORE SCROLL: last character card id: ${lastIdBefore}`);

        // step 5: scroll the character list container
        cy.get('[data-testid="virtual-grid-scroll-container"]').scrollTo('bottom', {
          duration: 1000,
        });

        // step 6: wait for new data to load
        cy.wait(1000); // wait for pagination to kick in + debounce

        // step 7: scroll further the character list container
        cy.get('[data-testid="virtual-grid-scroll-container"]').scrollTo('bottom', {
          duration: 1000,
        });

        // step 8: capture new last visible card ID
        cy.get('[data-testid="character-card"]')
          .last()
          .invoke('attr', 'data-character-id')
          .then((lastIdAfter) => {
            cy.log(`AFTER SCROLL: last character card id: ${lastIdAfter}`);
            console.log(`AFTER SCROLL: last character card id: ${lastIdAfter}`);
            cy.task('logToTerminal', `AFTER SCROLL: last character card id: ${lastIdAfter}`);

            // step 8: assert new cards loaded
            expect(lastIdAfter).to.not.eq(lastIdBefore);
          });
      });
  });
});
