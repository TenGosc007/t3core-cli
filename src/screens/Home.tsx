import { Box, useApp, useInput } from "ink";

import { beep } from "@/services/settings";

import { Menu } from "../features/Menu/Menu";

export const Home = () => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "q") {
      beep();
      exit();
    }
  });

  return (
    <Box flexDirection="column">
      <Menu />
    </Box>
  );
};
