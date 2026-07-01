import { Box, Text } from "ink";

import packageJson from "package.json";

export const Header = () => {
  return (
    <>
      <Box borderStyle="single" borderColor="yellow" justifyContent="center">
        <Text bold color="redBright">
          Tic Tac Toe
        </Text>
      </Box>
      <Box justifyContent="flex-end">
        <Text dimColor>v{packageJson.version}</Text>
      </Box>
    </>
  );
};
