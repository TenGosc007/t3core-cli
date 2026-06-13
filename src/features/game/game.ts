import { ROUTES, type AppRoute } from "@/navigation/routes";
import { clearDown, restoreCursor, saveCursor } from "@/utils/viewUtils";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { PlayerEntry } from "./components/PlayerEntry";

export const GameView = async (): Promise<AppRoute> => {
  GameHeader();
  saveCursor();

  while (true) {
    restoreCursor();
    clearDown();

    GameEntryMessage();
    Board();
    GameStatusMessage();
    const entry = await PlayerEntry();

    if (entry === ROUTES.MENU) return entry;
  }
};
