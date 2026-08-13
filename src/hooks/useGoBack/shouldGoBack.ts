import type { Key } from "ink";

type Props = {
  specialKeys?: (keyof Key)[];
  specialInputs?: string[];
};

const isSpecialKey = (key: Key, specialKeys?: (keyof Key)[]) =>
  specialKeys?.some((k) => key[k]) ?? false;

export const shouldGoBack = (
  input: string,
  key: Key,
  { specialKeys, specialInputs }: Props = {},
): boolean => {
  if (key.escape || input === "q") return true;
  if (specialInputs?.includes(input)) return true;
  if (isSpecialKey(key, specialKeys)) return true;
  return false;
};
