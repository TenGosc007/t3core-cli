import { Box, Text } from "ink";

type GameInfoProps = {
  showInfo: boolean;
};

export const GameInfo = ({ showInfo }: GameInfoProps) => {
  return (
    <Box flexDirection="column" marginY={1}>
      <Text color="yellow">--------------------------------------------</Text>
      {showInfo ? (
        <Text color="gray" italic>
          Tic-tac-toe is a simple two-player game played on a 3x3 grid.
          Players take turns marking a square with X or O, trying to get three
          in a row horizontally, vertically, or diagonally. The game ends when
          one player wins or all squares are filled, resulting in a draw.
          {"\n"}Press "i" to hide game info
        </Text>
      ) : (
        <Text dimColor>Press "i" to show game info</Text>
      )}
      <Text color="yellow">--------------------------------------------</Text>
    </Box>
  );
};
