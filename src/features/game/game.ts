import type { KeyHandler } from "@/services/keyHandlerService";

import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { refreshInput } from "@/services/inputService";
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
  saveCursor();
  GameHeader();

  while (true) {
    const keyHanlder = gameKeyHandlerService.get();
    restoreAndClearDown();

    GameEntryMessage();
    Board(keyHanlder.position);
    GameStatusMessage();
    GameInformations();

    if (await playAgain()) continue;

    const entry = await entryHandler(keyHanlder);
    if (isExitKey(entry)) break;
  }

  gameKeyHandlerService.stop();
  refreshInput();
  return ROUTES.MENU;
};

async function entryHandler(akInstance?: KeyHandler | null) {
  if (akInstance?.running) {
    return await akInstance?.waitForKeyPress();
  }
  return await InputEntry();
}
