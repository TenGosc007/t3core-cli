import type { KeyHandler } from "@/services/keyHandlerService";

import { ROUTES, type AppRoute } from "@/navigation/routes";
import { ArrowKeyInstance } from "@/services/keyHandlerService/navInstances/arrowKeyInstance";
import { clearDown, restoreCursor, saveCursor } from "@/utils/viewUtils";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameInformations } from "./components/GameInformations";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { InputEntry } from "./components/InputEntry";
import { arrowKeyHandler } from "./util/arrowKeyHandler";

export const GameView = async (): Promise<AppRoute> => {
  GameHeader();
  saveCursor();

  const akInstance = ArrowKeyInstance.set({
    onKeyPress: arrowKeyHandler,
    initialPosition: 4,
  });

  while (true) {
    restoreCursor();
    clearDown();

    GameEntryMessage();
    Board(akInstance?.position);
    GameStatusMessage();
    GameInformations();

    const entry = await entryHandler(akInstance);
    if (entry === ROUTES.MENU) return entry;
  }
};

async function entryHandler(akInstance?: KeyHandler | null) {
  if (akInstance?.running) {
    return await akInstance?.waitForKeyPress();
  }

  return await InputEntry();
}
