import type { SettingsState } from "@/features/Settings/constants/settingsOptions";

import { create } from "zustand";

import { DEFAULT_SETTINGS } from "@/features/Settings/constants/settingsOptions";

import {
  createSettingsRepository,
  type SettingsRepository,
} from "./SettingsRepository";

type SettingsStore = SettingsState & {
  toggle: (key: "beep" | "arrowKeyNavigation") => void;
  reset: () => void;
  load: () => void;
};

const persist = (state: SettingsState, repository: SettingsRepository) => {
  repository.save({
    beep: state.beep,
    arrowKeyNavigation: state.arrowKeyNavigation,
  });
};

const createSettingsStore = (
  repository: SettingsRepository = createSettingsRepository(),
) =>
  create<SettingsStore>((set) => ({
    ...DEFAULT_SETTINGS,

    toggle: (key) =>
      set((state) => {
        const next = { ...state, [key]: !state[key] };
        persist(next, repository);
        return { [key]: next[key] };
      }),

    reset: () => {
      repository.save(DEFAULT_SETTINGS);
      set(DEFAULT_SETTINGS);
    },

    load: () => {
      set(repository.load());
    },
  }));

export const useSettingsStore = createSettingsStore();
