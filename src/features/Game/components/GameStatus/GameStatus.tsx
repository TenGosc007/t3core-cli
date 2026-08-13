import type { GameStatus as GameStatusType } from "../../engine/gameEngine";

import { Text } from "ink";

import { DEFAULT_SYMBOLS } from "../../engine/gameEngine";

type GameStatusProps = {
  gameStatus: GameStatusType;
};

export const GameStatus = ({ gameStatus }: GameStatusProps) => {
  if (gameStatus.status === "running") {
    return null;
  }

  if (gameStatus.status === "draw") {
    return (
      <Text bold color="whiteBright">
        The game is a draw 🤝
      </Text>
    );
  }

  const isX = gameStatus.winner === DEFAULT_SYMBOLS[0];
  const color = isX ? "green" : "red";

  return (
    <>
      <Text bold color="whiteBright">
        Player{" "}
      </Text>
      <Text bold color={color}>
        {gameStatus.winner}
      </Text>
      <Text bold color="whiteBright">
        {" "}
        wins! 🎉
      </Text>
    </>
  );
};
