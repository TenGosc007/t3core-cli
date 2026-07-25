import { isTTYAvailable } from "@/global/tty.global";

export type Settings = {
  beep: boolean;
  style: boolean;
  arrowNav: boolean;
};

export type SettingsKey = keyof Settings;

const createInitialSettings = (): Settings => ({
  beep: true,
  style: true,
  arrowNav: isTTYAvailable,
});

export class SettingsManager {
  private _settings: Settings;

  constructor(initialSettings?: Partial<Settings>) {
    this._settings = { ...createInitialSettings(), ...initialSettings };
  }

  getRuntimeSettings = (): Readonly<Settings> => {
    return {
      ...this._settings,
      arrowNav:
        isTTYAvailable && this._settings.style && this._settings.arrowNav,
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

  togglearrowNav = (): void => {
    if (!isTTYAvailable || !this._settings.style) return;
    this._settings.arrowNav = !this._settings.arrowNav;
  };
}

// Default singleton instance for the running CLI process
export const settingsManager = new SettingsManager();
