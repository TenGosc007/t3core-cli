import { gameManager } from "@/features/game/engine";
import { ToggleHistoryCommand } from "@/features/game/navigation/commands/toggleHistoryCommand";
import { ToggleInfoCommand } from "@/features/game/navigation/commands/toggleInfoCommand";
import { gameState } from "@/features/game/services/gameState";
import { type NavKey } from "@/global/navigationKeys";
import { QuitCommand } from "@/services/navigationService/commands/quitCommand";

const quitCommand = new QuitCommand(() => {
  gameManager.reset();
  gameState.reset();
});
const toggleHistoryCommand = new ToggleHistoryCommand();
const toggleInfoCommand = new ToggleInfoCommand();

export const actionKeysHandler = (key: string | null): NavKey | null => {
  if (key == null) return null;

  if (quitCommand.canHandle(key as NavKey)) {
    return quitCommand.execute();
  }

  if (toggleHistoryCommand.canHandle(key as NavKey)) {
    return toggleHistoryCommand.execute();
  }

  if (toggleInfoCommand.canHandle(key as NavKey)) {
    return toggleInfoCommand.execute();
  }

  return null;
};
