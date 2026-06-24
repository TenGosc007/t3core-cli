import type { KeyHandler } from "@/services/keyHandlerService";

import { Board } from "@/features/game/components/Board";
import { GameEntryMessage } from "@/features/game/components/GameEntryMessage";
import { GameInformations } from "@/features/game/components/GameInformations";
import { GameStatusMessage } from "@/features/game/components/GameStatusMessage";
import { InputEntry } from "@/features/game/components/InputEntry";
import { GameHeaderUI } from "@/features/game/components/ui/GameHeaderUI";
import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { playAgain } from "@/features/game/util/playAgain";
import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

export const GameView = async (): Promise<AppRoute> => {
  GameHeaderUI();
  saveCursor();

  while (true) {
    const keyHandler = gameKeyHandlerService.get();
    restoreAndClearDown();

    GameEntryMessage();
    Board({ selectedIndex: keyHandler.position });
    GameStatusMessage();
    GameInformations({ isKeyHandlerRunning: keyHandler.running });

    if (await playAgain()) continue;

    const entry = await entryHandler(keyHandler);
    if (isExitKey(entry)) break;
  }

  gameKeyHandlerService.stop();
  return ROUTES.MENU;
};

async function entryHandler(keyHandler?: KeyHandler | null) {
  if (keyHandler?.running) {
    return await keyHandler?.waitForKeyPress();
  }
  return await InputEntry();
}
