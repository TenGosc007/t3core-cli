import type { Key } from "ink";

import { useInput } from "ink";

import { useNavigateBack } from "@/navigation";
import { beep } from "@/services/settings";

import { shouldGoBack } from "./shouldGoBack";

type Props = {
  specialKeys?: (keyof Key)[];
  specialInputs?: string[];
};

export const useGoBack = ({ specialKeys, specialInputs }: Props = {}) => {
  const goBack = useNavigateBack();

  useInput((input, key) => {
    if (shouldGoBack(input, key, { specialKeys, specialInputs })) {
      beep();
      goBack();
    }
  });
};
