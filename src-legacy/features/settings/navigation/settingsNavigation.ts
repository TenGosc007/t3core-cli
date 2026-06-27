import type { KeyHandlerProps } from "@/services/keyHandlerService";
import type { SettingsManager } from "@/services/settings";

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
import { settingsManager } from "@/services/settings";

type SettingsNavigationProps = {
  settingsManager?: SettingsManager;
};

export const settingsNavigation = ({
  settingsManager: manager = settingsManager,
}: SettingsNavigationProps = {}) => {
  const listNavigationStrategy = new ListNavigationStrategy(
    INITIAL_SETTINGS_POSITION,
    LAST_SETTINGS_POSITION,
  );
  const navigationController = new NavigationController(
    listNavigationStrategy,
    [new QuitCommand(), new ToggleSelectedSettingCommand(manager)],
  );

  const handleKey = ({ key, position }: KeyHandlerProps) => {
    const currentPosition = position ?? INITIAL_SETTINGS_POSITION;
    return navigationController.handleKey(currentPosition, key.name);
  };

  return { handleKey };
};
