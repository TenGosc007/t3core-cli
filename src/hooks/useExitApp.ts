import { useApp, useInput } from "ink";
import { useState } from "react";

import { beep } from "@/services/settings";

export const useExitApp = () => {
  const { exit } = useApp();
  const [confirming, setConfirming] = useState(false);

  useInput((input) => {
    if (confirming) {
      if (input === "y") {
        exit();
      } else if (input === "n") {
        beep();
        setConfirming(false);
      }
      return;
    }

    if (input === "q") {
      beep();
      setConfirming(true);
    }
  });

  return { confirming, exit };
};
