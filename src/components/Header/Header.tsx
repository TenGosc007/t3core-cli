import { Box, Text } from "ink";

export const Header = () => {
  return (
    <Box borderStyle="single" borderColor="yellow" justifyContent="center">
      <Text bold color="redBright">
        Tic Tac Toe
      </Text>
    </Box>
  );
};
