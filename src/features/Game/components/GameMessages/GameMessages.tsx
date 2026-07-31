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
  const renderMessage = () => {
    const isRunning = gameStatus.status === "running";

    if (isInHistoryMode) return <HistoryList movesCount={movesCount} />;
    if (!isRunning) return <GameStatus gameStatus={gameStatus} />;
    if (inputError) return <InputError error={inputError} />;

    return <Text dimColor>...</Text>;
  };

  return (
    <Box justifyContent="center" marginTop={1}>
      {renderMessage()}
    </Box>
  );
};
