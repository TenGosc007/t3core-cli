import type { GameStatus as GameStatusType } from "../../engine/gameEngine";

import { Box, Text } from "ink";

import { GameStatus } from "../GameStatus";
import { HistoryList } from "../HistoryList";
import { InputError } from "../InputError";

type Props = {
  gameStatus: GameStatusType;
  inputError: string | null;
  movesCount: number;
  isInHistoryMode: boolean;
};

export const GameMessages = ({
  gameStatus,
  inputError,
  movesCount,
  isInHistoryMode,
}: Props) => {
  if (gameStatus.status === "running" && !inputError && !isInHistoryMode) {
    return (
      <Box justifyContent="center" marginTop={1}>
        <Text dimColor>...</Text>
      </Box>
    );
  }

  return (
    <Box justifyContent="center" marginTop={1}>
      <GameStatus gameStatus={gameStatus} />
      <InputError error={inputError} />
      <HistoryList movesCount={movesCount} />
    </Box>
  );
};
