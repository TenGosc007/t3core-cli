import type { KeyHandlerProps } from "@/services/keyHandlerService";

import { ToggleSelectedSettingCommand } from "@/features/settings/navigation/commands/toggleSelectedSettingCommand";
import {
  INITIAL_SETTINGS_POSITION,
  LAST_SETTINGS_POSITION,
} from "@/features/settings/options";
import {
  ListNavigationStrategy,
  NavigationController,
  QuitCommand,
} from "@/services/navigationService";

const listNavigationStrategy = new ListNavigationStrategy(
  INITIAL_SETTINGS_POSITION,
  LAST_SETTINGS_POSITION,
);
const navigationController = new NavigationController(listNavigationStrategy, [
  new QuitCommand(),
  new ToggleSelectedSettingCommand(),
]);

const handleKey = ({ key, position }: KeyHandlerProps) => {
  const currentPosition = position ?? INITIAL_SETTINGS_POSITION;
  return navigationController.handleKey(currentPosition, key.name);
};

export const settingsNavigation = {
  handleKey,
};
