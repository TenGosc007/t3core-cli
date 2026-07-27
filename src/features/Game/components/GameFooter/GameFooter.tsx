import { Box, Text } from "ink";

import { Footer } from "@/components/Footer";

import { gameInputSchema } from "../../validation/gameInputSchema";
import { getGameFooterHints } from "./getGameFooterHints";

type GameFooterProps = {
  onSubmit: (value: string) => void;
  historyMovesCount: number;
  isGameRunning?: boolean;
  isHistoryModeOn?: boolean;
};

export const GameFooter = ({
  isGameRunning,
  isHistoryModeOn,
  historyMovesCount,
  onSubmit,
}: GameFooterProps) => {
  if (!isGameRunning) {
    return (
      <Box padding={1}>
        <Text dimColor>Enter: play again · q: back to menu</Text>
      </Box>
    );
  }

  const { hints, arrowNavHints } = getGameFooterHints(
    historyMovesCount,
    isHistoryModeOn,
  );

  return (
    <Footer
      onSubmit={onSubmit}
      hints={hints}
      arrowNavHints={arrowNavHints}
      validationSchema={gameInputSchema}
    />
  );
};
