import type { SettingsState } from "@/features/Settings/constants/settingsOptions";

import Conf from "conf";

import { DEFAULT_SETTINGS } from "@/features/Settings/constants/settingsOptions";

export type SettingsRepository = {
  load: () => SettingsState;
  save: (settings: SettingsState) => void;
  clear: () => void;
};

type SettingsRecord = Record<string, boolean | string>;

export const createSettingsRepository = (
  conf?: Conf<SettingsRecord>,
): SettingsRepository => {
  const store =
    conf ??
    new Conf<SettingsRecord>({
      projectName: "t3core-cli",
      defaults: DEFAULT_SETTINGS as SettingsRecord,
    });

  return {
    load: () => ({
      beep: store.get("beep") as boolean,

      arrowKeyNavigation: store.get("arrowKeyNavigation") as boolean,
    }),
    save: (settings) => {
      store.set("beep", settings.beep);
      store.set("arrowKeyNavigation", settings.arrowKeyNavigation);
    },
    clear: () => store.clear(),
  };
};

export const settingsRepository = createSettingsRepository();
