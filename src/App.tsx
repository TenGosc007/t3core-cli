import { Box, Text, useApp, useInput } from "ink";

export const App = () => {
  const { exit } = useApp();
  useInput((input) => {
    if (input === "q") {
      exit();
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        t3core-cli — Ink is running!!!
      </Text>
      <Text dimColor>Press q to quit the game</Text>
    </Box>
  );
};
