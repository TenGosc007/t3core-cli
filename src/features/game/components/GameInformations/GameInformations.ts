import { gameManager } from "../../engine";
import { GameHint } from "./components/GameHint";
import { InputErrorMessage } from "./components/InputErrorMessage";
import { PlayerPrompt } from "./components/PlayerPrompt";

export const GameInformations = () => {
  const game = gameManager.getGame();

  if (game.getStatus().status === "running") {
    PlayerPrompt();
    GameHint();
    InputErrorMessage();
  }
};
