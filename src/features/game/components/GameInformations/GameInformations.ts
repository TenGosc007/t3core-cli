import { getGame } from "../../services/gameSession";
import { GameHint } from "./components/GameHint";
import { InputErrorMessage } from "./components/InputErrorMessage";
import { PlayerPrompt } from "./components/PlayerPrompt";

export const GameInformations = () => {
  const game = getGame();

  if (game.gameStatus.status === "running") {
    PlayerPrompt();
    GameHint();
    InputErrorMessage();
  }
};
