export type Settings = {
  beep: boolean;
  style: boolean;
  arrowKeyNavigation: boolean;
};

export type SettingsKey = keyof Settings;

const initialSettings: Settings = {
  beep: true,
  style: true,
  arrowKeyNavigation: true,
};

let settings = { ...initialSettings };

export const getSettings = () => {
  return settings;
};

export const resetSettings = () => {
  settings = { ...initialSettings };
};

export const toggleBeep = () => {
  settings.beep = !settings.beep;
};

export const toggleStyle = () => {
  settings.style = !settings.style;
};

export const toggleArrowKeyNavigation = () => {
  settings.arrowKeyNavigation = !settings.arrowKeyNavigation;
};
