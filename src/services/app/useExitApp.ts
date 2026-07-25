import { create } from "zustand";

import { beep } from "../settings";

type ExitAppStore = {
  confirming: boolean;
  setConfirming: (confirming: boolean) => void;
  exit: () => void;
};

export const useExitAppStore = create<ExitAppStore>((set) => ({
  confirming: false,
  setConfirming: (confirming: boolean) => {
    beep();
    return set({ confirming });
  },
  exit: () => {
    beep();
    return set({ confirming: true });
  },
}));
