import type { SettingsState } from "@/features/Settings/constants/settingsOptions";

import { create } from "zustand";

import { DEFAULT_SETTINGS } from "@/features/Settings/constants/settingsOptions";

import {
  createSettingsRepository,
  type SettingsRepository,
} from "./SettingsRepository";

export type SettingsStore = SettingsState & {
  toggle: (key: "beep" | "arrowNav" | "showHistory") => void;
  reset: () => void;
  load: () => void;
};

const persist = (state: SettingsState, repository: SettingsRepository) => {
  repository.save({
    beep: state.beep,
    arrowNav: state.arrowNav,
    showHistory: state.showHistory,
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
export const getArrowNavState = () => useSettingsStore.getState().arrowNav;
export const useSettingsArrowNav = () => useSettingsStore((s) => s.arrowNav);
export const useSettingsShowHistory = () =>
  useSettingsStore((s) => s.showHistory);
