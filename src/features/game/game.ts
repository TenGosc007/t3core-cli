import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { KeyHandler } from "@/services/keyHandlerService";
import type { SettingsManager } from "@/services/settings";

import { GameInformations } from "@/features/game/components/GameInformations";
import { InputEntry } from "@/features/game/components/InputEntry";
import { GameHeaderUI } from "@/features/game/components/ui/GameHeaderUI";
import { gameManager } from "@/features/game/engine";
import { createGameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import { gameStateManager } from "@/features/game/services/gameState";
import { playAgain } from "@/features/game/util/playAgain";
import { isExitKey } from "@/global/navigationKeys";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { settingsManager } from "@/services/settings";
import { restoreAndClearDown, saveCursor } from "@/utils/viewUtils";

import { BoardUI } from "./components/ui/BoardUI";
import { GameEntryMessageUI } from "./components/ui/GameEntryMessageUI";
import { GameStatusMessageUI } from "./components/ui/GameStatusMessageUI";

type GameViewProps = {
  gameState?: GameStateManager;
  manager?: GameManager;
  settingsManager?: SettingsManager;
  gameKeyHandlerService?: GameKeyHandlerService;
};

export const GameView = async ({
  gameState = gameStateManager,
  manager = gameManager,
  settingsManager: settings = settingsManager,
  gameKeyHandlerService,
}: GameViewProps = {}): Promise<AppRoute> => {
  const keyHandlerService =
    gameKeyHandlerService ??
    createGameKeyHandlerService({
      settingsManager: settings,
      gameStateManager: gameState,
      manager,
    });

  GameHeaderUI();
  saveCursor();

  while (true) {
    const game = manager.getGame();
    const keyHandler = keyHandlerService.get();
    restoreAndClearDown();

    GameEntryMessageUI({ showInfo: gameState.info });
    BoardUI({ fields: game.getBoard(), selectedIndex: keyHandler.position });
    GameStatusMessageUI({ gameStatus: game.getStatus() });
    GameInformations({
      game,
      isKeyHandlerRunning: keyHandler.running,
      gameState,
    });

    if (await playAgain({ game })) continue;

    const entry = await entryHandler({ game, keyHandler, gameState, manager });
    if (isExitKey(entry)) break;
  }

  keyHandlerService.stop();
  return ROUTES.MENU;
};

type EntryHandlerProps = {
  game: GameEngine;
  keyHandler?: KeyHandler | null;
  gameState: GameStateManager;
  manager?: GameManager;
};

async function entryHandler({
  game,
  keyHandler,
  gameState,
  manager,
}: EntryHandlerProps) {
  if (keyHandler?.running) {
    return await keyHandler?.waitForKeyPress();
  }
  return await InputEntry({ game, gameState, manager, keyHandler });
}
