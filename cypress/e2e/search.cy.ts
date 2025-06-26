describe('Search page ', () => {
  // check successful and fail search
  it('searches characters and handles both success and empty result states', () => {
    cy.visit('/search');

    // Step 1: Ensure the search page is loaded
    cy.get('[data-testid="search-character-page"]').should('exist');
    cy.log('Search page loaded');
    cy.task('logToTerminal', 'Search page loaded');

    // step 2: search input exist
    cy.get('[data-testid="search-input"]')
      .should('exist')
      .then(($input) => {
        const type = ($input[0] as HTMLInputElement).type;

        cy.log(`search field element type: ${type}`);
        cy.task('logToTerminal', `search field element type: ${type}`);
      });

    // step 3: Enter a valid query 'darth' and validate results
    const validQuery = 'darth';
    cy.get('[data-testid="search-input"]').clear().type(validQuery);
    cy.wait(500);
    cy.log(`searched for: ${validQuery}`);
    cy.task('logToTerminal', `searched for: ${validQuery}`);

    // At least 2 matching characters should appear
    cy.get('[data-testid="character-card"]')
      .should('have.length.at.least', 2)
      .then(($cards) => {
        const ids = $cards.toArray().map((el) => el.getAttribute('data-character-id'));

        cy.log(`search results for "${validQuery}" get character card ids: ${ids.join(', ')}`);
        cy.task(
          'logToTerminal',
          `search results for "${validQuery}" get character card ids: ${ids.join(', ')}`
        );
      });

    // Step 3: Now test an invalid/gibberish query
    const invalidQuery = 'bdbad';
    cy.get('[data-testid="search-input"]').clear().type(invalidQuery);
    cy.wait(500); // debounce
    cy.log(`searched for: ${invalidQuery}`);
    cy.task('logToTerminal', `searched for: ${invalidQuery}`);

    // Ensure no character card is visible
    cy.get('[data-testid="character-card"]').should('have.length', 0);
    cy.log(`search results for "${invalidQuery}" not character card found`);
    cy.task('logToTerminal', `search results for "${invalidQuery}" not character card found`);

    // Ensure error message appears
    cy.contains(`No character found for "${invalidQuery}"`).should('exist');
    cy.log(`error message visible for query "${invalidQuery}"`);
    cy.task('logToTerminal', `error message visible for query "${invalidQuery}"`);
  });

  // card content check
  it('searches "darth" and verifies all character card fields', () => {
    cy.visit('/search');

    // Step 1: Page load
    cy.get('[data-testid="search-character-page"]').should('exist');
    cy.log('Search page loaded');
    cy.task('logToTerminal', 'Search page loaded');

    // Step 2: Type 'darth'
    const query = 'darth';
    cy.get('[data-testid="search-input"]').clear().type(query);
    cy.wait(500);
    cy.log(`Searching for: ${query}`);
    cy.task('logToTerminal', `Searching for: ${query}`);

    // step 3: take first character card and check all properties in it
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

  // favorite toggle
  it('toggles favorite status on a character card in search results', () => {
    const query = 'darth';

    // Step 1: Visit search page
    cy.visit('/search');

    // Step 2: Ensure page is loaded
    cy.get('[data-testid="search-character-page"]').should('exist');
    cy.log('✅ Search page loaded');
    cy.task('logToTerminal', '✅ Search page loaded');

    // Step 3: Enter a search query
    cy.get('[data-testid="search-input"]').clear().type(query);
    cy.wait(500);
    cy.log(`🔎 Searched for: "${query}"`);
    cy.task('logToTerminal', `🔎 Searched for: "${query}"`);

    // Step 4: favorite button toggle
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

  // navigate to character detail page
  it('navigates to character detail page from search results', () => {
    const validQuery = 'darth';

    // Step 1: Visit search page
    cy.visit('/search');

    // Step 2: Wait for search page to load
    cy.get('[data-testid="search-character-page"]').should('exist');
    cy.log('✅ Search page loaded');
    cy.task('logToTerminal', '✅ Search page loaded');

    // Step 3: Enter search query
    cy.get('[data-testid="search-input"]').clear().type(validQuery);
    cy.wait(500);
    cy.log(`🔎 Searched for: "${validQuery}"`);
    cy.task('logToTerminal', `🔎 Searched for: "${validQuery}"`);

    // Step 4: Wait for cards to load and click the first one
    cy.get('[data-testid="character-card"]')
      .first()
      .should('exist')
      .then(($card) => {
        const characterId = $card.attr('data-character-id') || 'unknown';
        cy.wrap($card).click();

        cy.log(`🧭 Clicked character card with ID: ${characterId}`);
        cy.task('logToTerminal', `🧭 Clicked character card with ID: ${characterId}`);

        // Step 5: Validate detail page is loaded
        cy.url().should('include', `/character/${characterId}`);
        cy.get('[data-testid="character-detail-page"]').should('exist');
        cy.log(`✅ Character detail page loaded for ID: ${characterId}`);
        cy.task('logToTerminal', `✅ Character detail page loaded for ID: ${characterId}`);
      });
  });
});
