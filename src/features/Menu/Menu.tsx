import { Box, Text } from "ink";

import packageJson from "package.json";

import { MenuItem } from "./components/MenuItem/MenuItem";
import { MENU_OPTIONS } from "./constants/menuOptions";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex } = useMenuInput();

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Tic Tac Toe - v{packageJson.version}
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {MENU_OPTIONS.map((option, index) => (
          <MenuItem
            key={option.label}
            label={option.label}
            selected={index === selectedIndex}
          />
        ))}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>↑↓ Navigate · Enter Select · q Quit</Text>
      </Box>
    </Box>
  );
};
