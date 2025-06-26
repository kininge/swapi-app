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
        cy.get('[data-testid="favorite-button"]').click();
        cy.wait(300);

        cy.get('[data-testid="favorite-button"]')
          .invoke('text')
          .should((afterText) => {
            expect(afterText.trim()).not.to.eq(beforeText.trim());
          });

        cy.get('[data-testid="favorite-button"]').click(); // toggle back
        cy.wait(300);
      });
  });

  it('updates editable fields and reflects them in UI', () => {
    cy.prepareCharacterDetailPage('1');

    cy.get('[data-testid="update-button"]').click();

    const updates = {
      height: '201',
      mass: '123',
      skin_color: 'purple',
      hair_color: 'orange',
      eye_color: 'pink',
    };

    Object.entries(updates).forEach(([key, value]) => {
      cy.get(`[data-testid="updating-${key}"]`).clear().type(value);
    });

    cy.get('[data-testid="update-button"]').click();
    cy.wait(500);

    Object.values(updates).forEach((value) => {
      cy.get('[data-testid="character-property"]').contains(value);
    });
  });

  it('renders planet, film, and starship info or fallback messages', () => {
    cy.prepareCharacterDetailPage('1');

    const planetFields = ['climate', 'population', 'terrain', 'rotation_period', 'orbital_period'];
    planetFields.forEach((key) => {
      cy.get(`[data-testid="planet-${key}"]`).should('exist');
    });

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="film"]').length > 0) {
        cy.get('[data-testid="film"]').should('have.length.at.least', 1);
      } else {
        cy.get('[data-testid="no-film-exist"]').should('exist');
      }

      if ($body.find('[data-testid="starship"]').length > 0) {
        cy.get('[data-testid="starship"]').should('have.length.at.least', 1);
      } else {
        cy.get('[data-testid="no-starship-exist"]').should('exist');
      }
    });
  });

  it('handles empty update inputs gracefully', () => {
    cy.prepareCharacterDetailPage('1');
    cy.get('[data-testid="update-button"]').click();
    cy.get('[data-testid="updating-height"]').clear(); // leave empty
    cy.get('[data-testid="save-updates"]').click();
    cy.wait(300);
    cy.get('[data-testid="character-property"]').should('exist');
  });

  it('supports multiple updates and reflects the latest', () => {
    cy.prepareCharacterDetailPage('1');
    cy.get('[data-testid="update-button"]').click();
    cy.get('[data-testid="updating-skin_color"]').clear().type('green');
    cy.get('[data-testid="update-button"]').click();
    cy.wait(300);
    cy.get('[data-testid="update-button"]').click();
    cy.get('[data-testid="updating-skin_color"]').clear().type('blue');
    cy.get('[data-testid="update-button"]').click();
    cy.get('[data-testid="character-property"]').contains('blue');
  });

  it('persists updated values when revisiting detail page', () => {
    cy.prepareCharacterDetailPage('1');
    cy.get('[data-testid="update-button"]').click();
    cy.get('[data-testid="updating-hair_color"]').clear().type('silver');
    cy.get('[data-testid="update-button"]').click();
    cy.wait(300);

    // revisit the page
    cy.visit('/');
    cy.visit('/character/1');
    cy.get('[data-testid="character-property"]').contains('silver');
  });
});
