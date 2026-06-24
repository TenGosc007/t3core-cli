import type { GameStatus } from "t3core";

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

export type GameStatusMessageUIProps = {
  gameStatus: GameStatus;
};

export const GameStatusMessageUI = ({
  gameStatus,
}: GameStatusMessageUIProps) => {
  const line = messageForGameStatus(gameStatus);

  if (line === undefined) {
    return;
  }

  console.log("\t");
  console.log(line);
};
