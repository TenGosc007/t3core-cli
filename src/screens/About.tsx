import { Box, Text, useInput } from "ink";

import { ROUTES, useNavigate } from "../navigation";

const link = (text: string, url: string) =>
  `\x1B]8;;${url}\x1B\\${text}\x1B]8;;\x1B\\`;

export const About = () => {
  const navigate = useNavigate();

  useInput((_, key) => {
    if (key.return) {
      navigate(ROUTES.home);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        About
      </Text>
      <Box marginTop={1}>
        <Text>Tic Tac Toe CLI — built with Ink & React</Text>
      </Box>
      <Box flexDirection="column" marginTop={1}>
        <Text dimColor>Packages:</Text>
        <Text>
          {" "}
          {link(
            "npmjs.com/package/t3core",
            "https://www.npmjs.com/package/t3core",
          )}
        </Text>
        <Text>
          {" "}
          {link(
            "npmjs.com/package/t3core-cli",
            "https://www.npmjs.com/package/t3core-cli",
          )}
        </Text>
      </Box>
      <Text dimColor>Press Enter to go back</Text>
    </Box>
  );
};
