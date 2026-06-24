import { isTTYAvailable } from "@/global/tty.global";

export type Settings = {
  beep: boolean;
  style: boolean;
  arrowKeyNavigation: boolean;
};

export type SettingsKey = keyof Settings;

const createInitialSettings = (): Settings => ({
  beep: true,
  style: true,
  arrowKeyNavigation: isTTYAvailable,
});

export class SettingsManager {
  private _settings: Settings;

  constructor(initialSettings?: Partial<Settings>) {
    this._settings = { ...createInitialSettings(), ...initialSettings };
  }

  getRuntimeSettings = (): Readonly<Settings> => {
    return {
      ...this._settings,
      arrowKeyNavigation:
        isTTYAvailable &&
        this._settings.style &&
        this._settings.arrowKeyNavigation,
    };
  };

  resetSettings = (): void => {
    this._settings = createInitialSettings();
  };

  toggleBeep = (): void => {
    this._settings.beep = !this._settings.beep;
  };

  toggleStyle = (): void => {
    this._settings.style = !this._settings.style;
  };

  toggleArrowKeyNavigation = (): void => {
    if (!isTTYAvailable || !this._settings.style) return;
    this._settings.arrowKeyNavigation = !this._settings.arrowKeyNavigation;
  };
}

// Default singleton instance for the running CLI process
export const settingsManager = new SettingsManager();
