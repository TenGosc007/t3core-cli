import { Box, useApp, useInput } from "ink";

import { AppVersion } from "@/components/AppVersion/AppVersion";
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
      <Box justifyContent="flex-end">
        <AppVersion />
      </Box>
      <Menu />
    </Box>
  );
};
