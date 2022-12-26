export const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const getKeyForValue =
  <T>(record: Record<string, T>) =>
  (val: T): string =>
    Object.entries<T>(record).find(([_, value]) => value === val)?.[0] ??
    Object.keys(record)[0];
