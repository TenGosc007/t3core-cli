import { Box, Text } from "ink";

type Props = {
  movesCount: number;
};

export const HistoryList = ({ movesCount }: Props) => {
  const moves = ["Go to game start"];

  for (let i = 1; i <= movesCount; i++) {
    moves.push(`Go to move ${i}`);
  }

  return (
    <Box flexDirection="column">
      {moves.map((move, index) => (
        <Text key={index}>{move}</Text>
      ))}
    </Box>
  );
};
