import type { KeyHandler } from "@/services/keyHandlerService";

import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameInformations } from "./components/GameInformations";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { InputEntry } from "./components/InputEntry";
import { gameKeyHandlerService } from "./services/gameKeyHandlerService";
import { playAgain } from "./util/playAgain";

export const GameView = async (): Promise<AppRoute> => {
  GameHeader();
  saveCursor();

  while (true) {
    const keyHandler = gameKeyHandlerService.get();
    restoreAndClearDown();

    GameEntryMessage();
    Board(keyHandler.position);
    GameStatusMessage();
    GameInformations();

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
