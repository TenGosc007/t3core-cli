import type readline from "readline";

import { KNOWN_NAV_KEYS_SET, type NavKey } from "@/global/navigationKeys";

type RawReadlineKey = Omit<readline.Key, "name"> & {
  name?: string;
};

// Normalized Readline Key
export type ReadlineKey = Omit<RawReadlineKey, "name"> & {
  name: NavKey;
};

const isNavKey = (keyName?: string | null): keyName is NavKey => {
  return typeof keyName === "string" && KNOWN_NAV_KEYS_SET.has(keyName);
};

const normalizeKey = (key: RawReadlineKey): NavKey | null => {
  return isNavKey(key.name) ? key.name : null;
};

export const normalizeReadlineKey = (
  key: RawReadlineKey,
): ReadlineKey | null => {
  const name = normalizeKey(key);

  if (!name) return null;

  return { ...key, name };
};
