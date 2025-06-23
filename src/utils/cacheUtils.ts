export const getTitleById = <T extends { uid: string; properties: { title: string } }>(
  list: T[],
  id: string
): string | undefined => list.find((item) => item.uid === id)?.properties.title;
