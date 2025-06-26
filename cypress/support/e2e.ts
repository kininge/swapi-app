import './commands';

/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      prepareFavoriteCharacter(): Chainable<void>;
      prepareCharacterDetailPage(characterId: string, shouldExist: boolean): Chainable<void>;
    }
  }
}

export {};
