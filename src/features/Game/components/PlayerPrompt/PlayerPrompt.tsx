import type { PlayerSymbol } from "t3core";

import { Box, Text } from "ink";
import { DEFAULT_GAME_SYMBOLS } from "t3core";

type PlayerPromptProps = {
  currentPlayer: PlayerSymbol;
};

export const PlayerPrompt = ({ currentPlayer }: PlayerPromptProps) => {
  const isX = currentPlayer === DEFAULT_GAME_SYMBOLS[0];
  const color = isX ? "green" : "red";

  return (
    <Box marginTop={1}>
      <Text underline>Player:</Text>
      <Text color={color} bold>
        {" "}
        {currentPlayer}
      </Text>
    </Box>
  );
};
