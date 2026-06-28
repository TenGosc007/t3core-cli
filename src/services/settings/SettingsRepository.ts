import type { SettingsState } from "@/features/Settings/constants/settingsOptions";

import Conf from "conf";

import {
  DEFAULT_SETTINGS,
  SETTINGS_KEYS,
} from "@/features/Settings/constants/settingsOptions";
import packageJson from "package.json";

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
      projectName: packageJson.name ?? "t3core-cli",
      defaults: DEFAULT_SETTINGS as SettingsRecord,
    });

  return {
    load: () => ({
      beep: store.get(SETTINGS_KEYS.beep) as boolean,
      arrowKeyNavigation: store.get(
        SETTINGS_KEYS.arrowKeyNavigation,
      ) as boolean,
    }),
    save: (settings) => {
      store.set(SETTINGS_KEYS.beep, settings.beep);
      store.set(SETTINGS_KEYS.arrowKeyNavigation, settings.arrowKeyNavigation);
    },
    clear: () => store.clear(),
  };
};
