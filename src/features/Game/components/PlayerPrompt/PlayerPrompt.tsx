import type { PlayerSymbol } from "../../engine/gameEngine";

import { Box, Text } from "ink";

import { DEFAULT_SYMBOLS } from "../../engine/gameEngine";

type PlayerPromptProps = {
  currentPlayer: PlayerSymbol;
};

export const PlayerPrompt = ({ currentPlayer }: PlayerPromptProps) => {
  const isX = currentPlayer === DEFAULT_SYMBOLS[0];
  const color = isX ? "green" : "red";

  return (
    <Box justifyContent="center" gap={1}>
      <Text underline>Player:</Text>
      <Text color={color} bold>
        {currentPlayer}
      </Text>
    </Box>
  );
};
