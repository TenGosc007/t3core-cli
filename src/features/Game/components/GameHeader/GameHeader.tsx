import { Box, Text } from "ink";

export const GameHeader = () => {
  return (
    <Box justifyContent="center" gap={1}>
      <Text color="green" dimColor>
        ===================
      </Text>
      <Text bold color="red">
        GAME
      </Text>
      <Text color="green" dimColor>
        ===================
      </Text>
    </Box>
  );
};
