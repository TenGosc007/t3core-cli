import { Box, useApp, useInput } from "ink";

import { Menu } from "../features/Menu/Menu";

export const Home = () => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "q") {
      exit();
    }
  });

  return (
    <Box flexDirection="column">
      <Menu />
    </Box>
  );
};
