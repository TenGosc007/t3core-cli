import { KeyHandler } from "@/components/KeyHandler";
import { ArrowKeyNavInstance } from "@/navigation/arrowKeyNav";
import { ROUTES, type AppRoute } from "@/navigation/routes";
import { clearDown, restoreCursor, saveCursor } from "@/utils/viewUtils";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { PlayerEntry } from "./components/PlayerEntry";
import { arrowKeyHandler } from "./util/arrowKeyHandler";

export const GameView = async (): Promise<AppRoute> => {
  GameHeader();
  saveCursor();

  const handler = ArrowKeyNavInstance.set(
    new KeyHandler({ onKeyPress: arrowKeyHandler }),
  );

  while (true) {
    restoreCursor();
    clearDown();

    GameEntryMessage();
    Board(handler?.position ?? 4);
    GameStatusMessage();

    const entry = await PlayerEntry();
    if (entry === ROUTES.MENU) return entry;
  }
};
