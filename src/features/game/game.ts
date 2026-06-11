import type { AppRoute } from "@/navigation/routes";
import type { Game } from "t3core";

import { Header } from "@/components/Header";
import { ROUTES } from "@/navigation/routes";
import { beepAndClear } from "@/utils/beepAndClear";
import { s } from "@/utils/styledLabel";

import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { getPlayerAnswer } from "./components/PlayerEntry/utils/getPlayerAnswer";
import { playAgain } from "./components/PlayerEntry/utils/playAgain";
import { getGame } from "./services/gameSession";
import { colorLabelSymbol } from "./util/colorLabelSymbol";

const renderBoard = () => {
  beepAndClear();
  Header();
  GameHeader();
  GameEntryMessage();
  Board();
  GameStatusMessage();
};

const renderPlayerPrompt = (game: Game) => {
  console.log(`\t`);
  console.log(
    `${s.white.underline("Player:")} (${colorLabelSymbol(game.currentPlayer)})`,
  );
  console.log(`\t`);
  console.log(s.white("Select the number of the field (1-9)"));
  if (game.movesCount > 0) {
    console.log(s.dim('Press "h" to show game history'));
  }
  console.log(s.dim('Press "q" to back to the main menu'));
  console.log(`\t`);
};

export const GameView = async (): Promise<AppRoute> => {
  const game = getGame();

  while (true) {
    renderBoard();

    if (game.gameStatus.status !== "running") {
      await playAgain();
      return ROUTES.GAME;
    }

    renderPlayerPrompt(game);

    const answer = await getPlayerAnswer();
    if (answer === "quit") return ROUTES.MENU;
    if (answer === null) continue;

    game.savePlayerMove(answer);
  }
};
