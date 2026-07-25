import type { Key } from "ink";

import { useInput } from "ink";

import { useNavigateBack } from "@/navigation";
import { beep } from "@/services/settings";

type Props = {
  specialKeys?: (keyof Key)[];
  specialInputs?: string[];
};

const isSpecialKey = (key: Key, specialKeys?: (keyof Key)[]) => {
  return Object.keys(key).some((k) => specialKeys?.includes(k as keyof Key));
};

export const useGoBack = ({ specialKeys, specialInputs }: Props = {}) => {
  const goBack = useNavigateBack();

  useInput((input, key) => {
    const isDefaultKey = key.escape;
    const isSpecialInput = specialInputs?.includes(input);
    const isSpecialKeyCode = isSpecialKey(key, specialKeys);

    if (isDefaultKey || isSpecialInput || isSpecialKeyCode) {
      beep();
      goBack();
    }
  });
};
