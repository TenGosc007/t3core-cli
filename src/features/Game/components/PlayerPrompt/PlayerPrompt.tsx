import type { PlayerSymbol } from "../../engine/gameEngine";

import { Box, Text } from "ink";

import { Spinner } from "@/components/Spinner";

import { DEFAULT_SYMBOLS } from "../../engine/gameEngine";

type PlayerPromptProps = {
  currentPlayer: PlayerSymbol;
};

export const PlayerPrompt = ({ currentPlayer }: PlayerPromptProps) => {
  const isO = currentPlayer === DEFAULT_SYMBOLS[0];
  const color = isO ? "green" : "red";

  return (
    <Box justifyContent="center" gap={1}>
      <Text underline>Player:</Text>
      <Text color={color} bold>
        {currentPlayer} {!isO ? <Spinner /> : null}
      </Text>
    </Box>
  );
};
