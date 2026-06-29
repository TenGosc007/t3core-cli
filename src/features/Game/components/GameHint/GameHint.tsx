import { Box, Text } from "ink";

type GameHintProps = {
  movesCount: number;
  useArrowKeys: boolean;
  isHistoryMode: boolean;
};

export const GameHint = ({
  movesCount,
  useArrowKeys,
  isHistoryMode,
}: GameHintProps) => {
  const instruction = isHistoryMode
    ? `Select previous move (0-${movesCount}). 0 is start from the beginning`
    : useArrowKeys
      ? "Use arrow keys to navigate, Enter to confirm"
      : "Select the number of the field (1-9)";

  return (
    <Box flexDirection="column">
      <Text>{instruction}</Text>
      {movesCount > 0 && (
        <Text dimColor>
          Press "h" to {isHistoryMode ? "hide" : "show"} game history
        </Text>
      )}
      <Text dimColor>Press "q" to back to the main menu</Text>
    </Box>
  );
};
