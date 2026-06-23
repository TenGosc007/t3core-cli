import type { ReadlineKey } from "@/services/keyHandlerService";

import { isExitKey, NAV_KEYS } from "@/global/navigationKeys";
import {
  ListNavigationStrategy,
  NavigationController,
} from "@/services/navigationService";
import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
} from "@/services/settings";

import {
  INITIAL_SETTINGS_ID,
  SETTINGS_OPTIONS,
} from "../constants/settingsOptions";

type SettingsNavigationProps = {
  key: ReadlineKey;
  position: number | string | null;
};

const settingsLength = SETTINGS_OPTIONS.length;

const navigationController = new NavigationController(
  INITIAL_SETTINGS_ID,
  new ListNavigationStrategy(INITIAL_SETTINGS_ID, settingsLength),
);

const positionHelper = (position: number | null) => {
  return position ?? INITIAL_SETTINGS_ID;
};

const onEnterPress = (position: number | null) => {
  if (position === 1) {
    toggleBeep();
  }
  if (position === 2) {
    toggleStyle();
  }
  if (position === 3) {
    toggleArrowKeyNavigation();
  }
  if (position === 4) {
    resetSettings();
  }
};

const handleKey = ({ key, position }: SettingsNavigationProps) => {
  if (isExitKey(key.name)) return NAV_KEYS.Q;
  if (typeof position === "string") return position;

  const currentPosition = positionHelper(position);
  navigationController.reset(currentPosition);

  const nextPosition = navigationController.handleKey(key.name);

  if (key.name === NAV_KEYS.ENTER) {
    onEnterPress(position);
  }

  if (typeof nextPosition === "number") return nextPosition;
  return currentPosition;
};

export const settingsNavigation = {
  handleKey,
  reset: () => navigationController.reset(INITIAL_SETTINGS_ID),
};
