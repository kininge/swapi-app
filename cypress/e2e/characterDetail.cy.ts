/// <reference types="cypress" />

describe('Character Detail Page', () => {
  it('renders full detail page for valid character id', () => {
    cy.prepareCharacterDetailPage('1', true);
  });

  it('renders full detail page for invalid character id', () => {
    cy.prepareCharacterDetailPage('100', false);
  });

  it('toggles favorite status from detail page', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="favorite-button"]')
      .should('exist')
      .invoke('text')
      .then((beforeText) => {
        cy.log(`step 4: favorite button state: ${beforeText}`); // GUI logs
        console.log(`step 4: favorite button state: ${beforeText}`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 4: favorite button state: ${beforeText}`); // terminal log

        cy.get('[data-testid="favorite-button"]').click();
        cy.log(`step 5: favorite button clicked`); // GUI logs
        console.log(`step 5: favorite button clicked`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 5: favorite button clicked`); // terminal log
        cy.wait(300);

        cy.get('[data-testid="favorite-button"]')
          .should('exist')
          .invoke('text')
          .then((afterText) => {
            cy.log(`step 6: favorite button state: ${afterText}`); // GUI logs
            console.log(`step 6: favorite button state: ${afterText}`); // electron browser dev tool logs
            cy.task('logToTerminal', `step 6: favorite button state: ${afterText}`); // terminal log

            expect(afterText.trim()).not.to.eq(beforeText.trim());
            cy.log(`step 7: favorite button state changed`); // GUI logs
            console.log(`step 7: favorite button state changed`); // electron browser dev tool logs
            cy.task('logToTerminal', `step 7: favorite button state changed`); // terminal log
          });

        cy.get('[data-testid="favorite-button"]').click(); // toggle back
        cy.log(`step 8: favorite button clicked`); // GUI logs
        console.log(`step 8: favorite button clicked`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 8: favorite button clicked`); // terminal log
        cy.wait(300);

        cy.get('[data-testid="favorite-button"]')
          .should('exist')
          .invoke('text')
          .then((afterAfterText) => {
            cy.log(`step 9: favorite button state: ${afterAfterText}`); // GUI logs
            console.log(`step 9: favorite button state: ${afterAfterText}`); // electron browser dev tool logs
            cy.task('logToTerminal', `step 9: favorite button state: ${afterAfterText}`); // terminal log

            expect(afterAfterText.trim()).equal(beforeText.trim());
            cy.log(`step 10: original state achieved again`); // GUI logs
            console.log(`step 10: original state achieved again`); // electron browser dev tool logs
            cy.task('logToTerminal', `step 10: original state achieved again`); // terminal log
          });
      });
  });

  it('updates editable fields and reflects them in UI', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="update-button"]').click();
    cy.log(`step 4: edit button clicked`); // GUI logs
    console.log(`step 4: edit button clicked`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 4: edit button clicked`); // terminal log

    const updates = {
      height: '201',
      mass: '123',
      skin_color: 'purple',
      hair_color: 'orange',
      eye_color: 'pink',
    };

    Object.entries(updates).forEach(([key, value]) => {
      cy.get(`[data-testid="updating-${key}"]`).clear().type(value);
      cy.log(`step 5: ${key} updated to: ${value}`); // GUI logs
      console.log(`step 5: ${key} updated to: ${value}`); // electron browser dev tool logs
      cy.task('logToTerminal', `step 5: ${key} updated to: ${value}`); // terminal log
    });

    cy.get('[data-testid="save-updates"]').click();
    cy.log(`step 6: updated value saved`); // GUI logs
    console.log(`step 6: updated value saved`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 6: updated value saved`); // terminal log
    cy.wait(500);

    Object.values(updates).forEach((value) => {
      cy.get('[data-testid="character-property"]').contains(value);
      cy.log(`step 7: value found; ${value}`); // GUI logs
      console.log(`step 7: value found; ${value}`); // electron browser dev tool logs
      cy.task('logToTerminal', `step 7: value found; ${value}`); // terminal log
    });
  });

  it('renders planet, film, and starship info or fallback messages', () => {
    cy.prepareCharacterDetailPage('1');

    const planetFields = ['climate', 'population', 'terrain', 'rotation_period', 'orbital_period'];
    planetFields.forEach((key) => {
      cy.get(`[data-testid="planet-${key}"]`).should('exist');
      cy.log(`step 4: planet data found ${key}`); // GUI logs
      console.log(`step 4: planet data found ${key}`); // electron browser dev tool logs
      cy.task('logToTerminal', `step 4: planet data found ${key}`); // terminal log
    });

    cy.get('[data-testid="film"]').should('have.length.at.least', 4);
    cy.log(`step 5: 4 film data found`); // GUI logs
    console.log(`step 5: 4 film data found`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 5: 4 film data found`); // terminal log

    cy.get('[data-testid="starship"]').should('have.length.at.least', 2);
    cy.log(`step 6: 2 starship data found`); // GUI logs
    console.log(`step 6: 2 starship data found`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 5: 2 starship data found`); // terminal log
  });

  it('handles empty update inputs gracefully', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="update-button"]').click();
    cy.log(`step 4: update button clicked`); // GUI logs
    console.log(`step 4: update button clicked`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 4: update button clicked`); // terminal log

    cy.get('[data-testid="updating-height"]').clear(); // leave empty
    cy.log(`step 5: clear height data`); // GUI logs
    console.log(`step 5: clear height data`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 5: clear height data`); // terminal log

    cy.get('[data-testid="save-updates"]').click();
    cy.log(`step 6: changes saved`); // GUI logs
    console.log(`step 6: changes saved`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 6: changes saved`); // terminal log
    cy.wait(300);

    cy.get('[data-testid="character-property-height"]')
      .should('exist')
      .invoke('text')
      .then((value) => {
        cy.log(`step 7: height value : ${value}`); // GUI logs
        console.log(`step 7: height value : ${value}`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 7: height value : ${value}`); // terminal log

        expect(value.trim().toLowerCase()).equal('unknown');
        cy.log(`step 8: height value become Unkown`); // GUI logs
        console.log(`step 8: height value become Unkown`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 8: height value become Unkown`); // terminal log
      });
  });

  it('supports multiple updates and reflects the latest', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="update-button"]').click();
    cy.log(`step 4: update button clicked`); // GUI logs
    console.log(`step 4: update button clicked`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 4: update button clicked`); // terminal log

    cy.get('[data-testid="updating-skin_color"]').clear().type('green');
    cy.log(`step 5: update skin color to green`); // GUI logs
    console.log(`step 5: update skin color to green`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 5: update skin color to green`); // terminal log

    cy.get('[data-testid="save-updates"]').click();
    cy.log(`step 6: changes saved`); // GUI logs
    console.log(`step 6: changes saved`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 6: changes saved`); // terminal log
    cy.wait(300);

    cy.get('[data-testid="character-property-skin_color"]')
      .should('exist')
      .invoke('text')
      .then((value) => {
        cy.log(`step 7: Skin color value : ${value}`); // GUI logs
        console.log(`step 7: Skin color value : ${value}`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 7: Skin color value : ${value}`); // terminal log

        expect(value.trim().toLowerCase()).equal('green');
        cy.log(`step 8: Skin color value become green`); // GUI logs
        console.log(`step 8: Skin color value become green`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 8: Skin color value become green`); // terminal log
      });

    cy.get('[data-testid="update-button"]').click();
    cy.log(`step 9: update button clicked`); // GUI logs
    console.log(`step 9: update button clicked`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 9: update button clicked`); // terminal log

    cy.get('[data-testid="updating-skin_color"]').clear().type('blue');
    cy.log(`step 10: update skin color to blue`); // GUI logs
    console.log(`step 10: update skin color to blue`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 10: update skin color to blue`); // terminal log

    cy.get('[data-testid="save-updates"]').click();
    cy.log(`step 11: changes saved`); // GUI logs
    console.log(`step 11: changes saved`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 11: changes saved`); // terminal log
    cy.wait(300);

    cy.get('[data-testid="character-property-skin_color"]')
      .should('exist')
      .invoke('text')
      .then((value) => {
        cy.log(`step 12: Skin color value : ${value}`); // GUI logs
        console.log(`step 12: Skin color value : ${value}`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 12: Skin color value : ${value}`); // terminal log

        expect(value.trim().toLowerCase()).equal('blue');
        cy.log(`step 13: Skin color value become blue`); // GUI logs
        console.log(`step 13: Skin color value become blue`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 13: Skin color value become blue`); // terminal log
      });
  });

  it('persists updated values when revisiting detail page', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="update-button"]').click();
    cy.log(`step 4: update button clicked`); // GUI logs
    console.log(`step 4: update button clicked`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 4: update button clicked`); // terminal log

    cy.get('[data-testid="updating-hair_color"]').clear().type('silver');
    cy.log(`step 5: update skin color to silver`); // GUI logs
    console.log(`step 5: update skin color to silver`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 5: update skin color to silver`); // terminal log

    cy.get('[data-testid="save-updates"]').click();
    cy.log(`step 6: changes saved`); // GUI logs
    console.log(`step 6: changes saved`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 6: changes saved`); // terminal log
    cy.wait(300);

    // revisit the page
    cy.visit('/');
    cy.log(`step 7: move to home page`); // GUI logs
    console.log(`step 7: move to home page`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 7: move to home page`); // terminal log
    cy.wait(300);

    cy.visit('/character/1');
    cy.log(`step 8: move character detail page for id 1`); // GUI logs
    console.log(`step 8: move character detail page for id 1`); // electron browser dev tool logs
    cy.task('logToTerminal', `step 8: move character detail page for id 1`); // terminal log
    cy.wait(1200);

    cy.get('[data-testid="character-property-hair_color"]')
      .should('exist')
      .invoke('text')
      .then((value) => {
        cy.log(`step 9: Hair color value : ${value}`); // GUI logs
        console.log(`step 9: Hair color value : ${value}`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 9: Hair color value : ${value}`); // terminal log

        expect(value.trim().toLowerCase()).equal('silver');
        cy.log(`step 10: Hair color value become silver`); // GUI logs
        console.log(`step 10: Hair color value become silver`); // electron browser dev tool logs
        cy.task('logToTerminal', `step 10: Hair color value become silver`); // terminal log
      });
  });
});
