import { Box, Newline, Text, useInput } from "ink";

import { AppVersion } from "@/components/AppVersion/AppVersion";

import { ROUTES, useNavigate } from "../navigation";

export const About = () => {
  const navigate = useNavigate();

  useInput((_, key) => {
    if (key.return) navigate(ROUTES.home);
  });

  return (
    <Box flexDirection="column">
      <Box
        borderTop={false}
        borderLeft={false}
        borderRight={false}
        borderStyle="single"
        borderColor="gray"
      >
        <Text bold color="cyan">
          About
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text>Tic Tac Toe CLI — built with Ink & React</Text>
      </Box>
      <AppVersion />
      <Box flexDirection="column" marginTop={1}>
        <Text bold>Packages:</Text>
        <Text color="magenta" underline>
          https://www.npmjs.com/package/t3core
        </Text>
        <Text color="magenta" underline>
          https://www.npmjs.com/package/t3core-cli
        </Text>
      </Box>
      <Newline />
      <Text dimColor>Press Enter to go back</Text>
    </Box>
  );
};
