export const extractIdFromUrl = (url: string): string => {
  return url.split('/').pop() ?? '';
};
