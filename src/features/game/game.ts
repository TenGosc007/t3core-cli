import type { AppRoute } from "@/navigation/routes";

import { Header } from "@/components/Header";
import { ROUTES } from "@/navigation/routes";
import { beepAndClear } from "@/utils/beepAndClear";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { getPlayerAnswer } from "./components/PlayerEntry/utils/getPlayerAnswer";
import { playAgain } from "./components/PlayerEntry/utils/playAgain";
import { PlayerPrompt } from "./components/PlayerPrompt";
import { getGame } from "./services/gameSession";

const renderBoard = () => {
  beepAndClear();
  Header();
  GameHeader();
  GameEntryMessage();
  Board();
  GameStatusMessage();
};

export const GameView = async (): Promise<AppRoute> => {
  const game = getGame();

  while (true) {
    renderBoard();

    if (game.gameStatus.status !== "running") {
      await playAgain();
      return ROUTES.GAME;
    }

    PlayerPrompt(game);

    const answer = await getPlayerAnswer();
    if (answer === "quit") return ROUTES.MENU;
    if (answer === null) continue;

    game.savePlayerMove(answer);
  }
};
