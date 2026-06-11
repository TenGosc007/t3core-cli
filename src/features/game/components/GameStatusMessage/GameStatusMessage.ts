import type { GameStatus } from "t3core";

import { getGame } from "@/features/game/services/gameSession";
import { colorLabelSymbol } from "@/features/game/util/colorLabelSymbol";
import { s } from "@/utils/styledLabel";

function messageForGameStatus(gameStatus: GameStatus): string | undefined {
  switch (gameStatus.status) {
    case "running":
      return undefined;
    case "draw":
      return s.whiteBright("The game is a draw 🤝");
    case "win":
      return `${s.whiteBright("Player")} ${colorLabelSymbol(gameStatus.winner)} ${s.whiteBright("wins! 🎉")}`;

    default:
      throw new Error(`Unknown game status: ${gameStatus satisfies never}`);
  }
}

export const GameStatusMessage = () => {
  const line = messageForGameStatus(getGame().gameStatus);

  if (line === undefined) {
    return;
  }

  console.log("\t");
  console.log(line);
};
