import type { CHARACTER } from '../features/characters/types';

export const mergeCharacterWithEdits = (
  character: CHARACTER,
  overrides: Partial<CHARACTER> | undefined
): CHARACTER => {
  return { ...character, ...overrides };
};
