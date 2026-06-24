import type { GameEngine } from "@/features/game/engine";
import type { KeyHandler } from "@/services/keyHandlerService";

import { GameEntryMessage } from "@/features/game/components/GameEntryMessage";
import { GameInformations } from "@/features/game/components/GameInformations";
import { InputEntry } from "@/features/game/components/InputEntry";
import { GameHeaderUI } from "@/features/game/components/ui/GameHeaderUI";
import { gameManager } from "@/features/game/engine";
import { gameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { playAgain } from "@/features/game/util/playAgain";
import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { BoardUI } from "./components/ui/BoardUI";
import { GameStatusMessageUI } from "./components/ui/GameStatusMessageUI";

export const GameView = async (): Promise<AppRoute> => {
  GameHeaderUI();
  saveCursor();

  while (true) {
    const game = gameManager.getGame();
    const keyHandler = gameKeyHandlerService.get();
    restoreAndClearDown();

    GameEntryMessage();
    BoardUI({ fields: game.getBoard(), selectedIndex: keyHandler.position });
    GameStatusMessageUI({ gameStatus: game.getStatus() });
    GameInformations({ game, isKeyHandlerRunning: keyHandler.running });

    if (await playAgain({ game })) continue;

    const entry = await entryHandler({ game, keyHandler });
    if (isExitKey(entry)) break;
  }

  gameKeyHandlerService.stop();
  return ROUTES.MENU;
};

type EntryHandlerProps = {
  game: GameEngine;
  keyHandler?: KeyHandler | null;
};

async function entryHandler({ game, keyHandler }: EntryHandlerProps) {
  if (keyHandler?.running) {
    return await keyHandler?.waitForKeyPress();
  }
  return await InputEntry({ game });
}
