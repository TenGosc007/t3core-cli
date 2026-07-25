import { Box, Text } from "ink";

type GameHintProps = {
  movesCount: number;
  useArrowNavs: boolean;
  isHistoryMode: boolean;
};

export const GameHint = ({
  movesCount,
  useArrowNavs,
  isHistoryMode,
}: GameHintProps) => {
  const instruction = isHistoryMode
    ? `Select previous move (0-${movesCount}). 0 is start from the beginning`
    : useArrowNavs
      ? "Use arrow keys to navigate, Enter to confirm"
      : "Select the number of the field (1-9)";

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text dimColor>{instruction}</Text>
      <Text dimColor>- Press "q" to quit</Text>
      {movesCount > 0 && (
        <Text dimColor>
          - Press "h" to {isHistoryMode ? "hide" : "show"} game history
        </Text>
      )}
    </Box>
  );
};
