import {
  hasCharacterPageCalled,
  markCharacterPageAsCalled,
  clearAllCalledCharacterPages,
} from '../characterPageFetchGuard';

describe('characterPageFetchGuard utils', () => {
  beforeEach(() => {
    clearAllCalledCharacterPages();
  });

  // page not exist in cache
  it('returns false for page not yet marked', () => {
    expect(hasCharacterPageCalled(1)).toBe(false);
  });

  // page exist in cache
  it('returns true after page is marked as called', () => {
    markCharacterPageAsCalled(2);
    expect(hasCharacterPageCalled(2)).toBe(true);
  });

  // clear cache
  it('clears all tracked pages', () => {
    markCharacterPageAsCalled(3);
    expect(hasCharacterPageCalled(3)).toBe(true);

    clearAllCalledCharacterPages();
    expect(hasCharacterPageCalled(3)).toBe(false);
  });
});
