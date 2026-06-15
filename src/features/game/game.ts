import { ROUTES, type AppRoute } from "@/navigation/routes";
import { clearDown, restoreCursor, saveCursor } from "@/utils/viewUtils";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameHint } from "./components/GameHint";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { InputErrorMessage } from "./components/InputErrorMessage";
import { PlayerEntry } from "./components/PlayerEntry";
import { PlayerPrompt } from "./components/PlayerPrompt";
import { getGame } from "./services/gameSession";

export const GameView = async (): Promise<AppRoute> => {
  GameHeader();
  saveCursor();

  // const handler = ArrowKeyInstance.set({ onKeyPress: arrowKeyHandler });

  while (true) {
    restoreCursor();
    clearDown();

    GameEntryMessage();
    Board();
    GameStatusMessage();
    GameInformations();

    const entry = await PlayerEntry();
    if (entry === ROUTES.MENU) return entry;
  }
};

function GameInformations() {
  const game = getGame();

  if (game.gameStatus.status === "running") {
    PlayerPrompt();
    GameHint();
    InputErrorMessage();
  }
}
