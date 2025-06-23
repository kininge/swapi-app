const fetchedCharacterPages = new Set<number>();

export const hasCharacterPageCalled = (page: number) => fetchedCharacterPages.has(page);
export const markCharacterPageAsCalled = (page: number) => fetchedCharacterPages.add(page);
export const clearAllCalledCharacterPages = () => fetchedCharacterPages.clear();
