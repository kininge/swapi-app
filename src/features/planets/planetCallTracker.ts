// features/planets/planetCallTracker.ts
const callTracker: Record<string, boolean> = {};

export const hasPlanetBeenFetched = (id: string): boolean => {
  return !!callTracker[id];
};

export const markPlanetAsFetched = (id: string): void => {
  callTracker[id] = true;
};
