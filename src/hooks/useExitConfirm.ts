import { useApp, useInput } from "ink";

import { useExitAppStore } from "@/services/app";

export const useExitConfirm = () => {
  const { exit } = useApp();
  const confirming = useExitAppStore((state) => state.confirming);
  const setConfirming = useExitAppStore((state) => state.setConfirming);

  useInput((input) => {
    if (input === "q") {
      setConfirming(true);
    }

    if (!confirming) return;

    if (input === "y") {
      exit();
    }

    if (input === "n") {
      setConfirming(false);
    }
  });

  return { confirming };
};
