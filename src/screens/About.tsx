import { Box, Newline, Text } from "ink";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { useGoBack } from "@/hooks/useGoBack";

export const About = () => {
  useGoBack({ specialKeys: ["return"] });

  return (
    <Container>
      <Header label="About" />
      <Box marginTop={1}>
        <Text>Tic Tac Toe CLI — built with Ink & React</Text>
      </Box>
      {/* <AppVersion /> */}
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
    </Container>
  );
};
