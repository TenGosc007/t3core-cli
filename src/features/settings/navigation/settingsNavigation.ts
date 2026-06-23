import type { ReadlineKey } from "@/services/keyHandlerService";

import {
  ListNavigationStrategy,
  NavigationController,
  QuitCommand,
} from "@/services/navigationService";

import {
  INITIAL_SETTINGS_ID,
  SETTINGS_OPTIONS,
} from "../constants/settingsOptions";
import { ToggleSelectedSettingCommand } from "./commands/toggleSelectedSettingCommand";

type SettingsNavigationProps = {
  key: ReadlineKey;
  position: number | string | null;
};

const settingsLength = SETTINGS_OPTIONS.length;

const navigationController = new NavigationController(
  INITIAL_SETTINGS_ID,
  new ListNavigationStrategy(INITIAL_SETTINGS_ID, settingsLength),
  [new QuitCommand(), new ToggleSelectedSettingCommand()],
);

const positionHelper = (position: number | null) => {
  return position ?? INITIAL_SETTINGS_ID;
};

const handleKey = ({ key, position }: SettingsNavigationProps) => {
  if (typeof position === "string") return position;

  const currentPosition = positionHelper(position);
  navigationController.reset(currentPosition);
  const nextPosition = navigationController.handleKey(key.name);

  if (typeof nextPosition === "number") return nextPosition;
  return nextPosition;
};

export const settingsNavigation = {
  handleKey,
  reset: () => navigationController.reset(INITIAL_SETTINGS_ID),
};
