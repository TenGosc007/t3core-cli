import type { ReadlineKey } from "@/services/keyHandlerService";

import { isExitKey, NAV_KEYS } from "@/global/navigationKeys";
import { ListNavigationStrategy } from "@/services/navigationService/strategies/listNavigationStrategy";
import {
  resetSettings,
  toggleArrowKeyNavigation,
  toggleBeep,
  toggleStyle,
} from "@/services/settings";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";

const settingsLenght = SETTINGS_OPTIONS.length;

const positionHelper = (position: number | null) => position ?? 1;
const listNavigationStrategy = new ListNavigationStrategy(1, settingsLenght);

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

export const settingsKeyHandler = ({
  key,
  position,
}: {
  key: ReadlineKey;
  position: number | string | null;
}) => {
  if (isExitKey(key.name)) return NAV_KEYS.Q;
  if (typeof position === "string") return position;

  const currentPosition = positionHelper(position);
  const newPosition = listNavigationStrategy.move(currentPosition, key.name);

  if (key.name === NAV_KEYS.ENTER) {
    onEnterPress(position);
  }

  return newPosition;
};
