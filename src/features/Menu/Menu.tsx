import { Box, Text } from "ink";

import { MenuItem } from "./components/MenuItem/MenuItem";
import { MENU_OPTIONS } from "./constants/menuOptions";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex, arrowKeyNavigation } = useMenuInput();

  return (
    <Box flexDirection="column">
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
        {arrowKeyNavigation ? (
          <Text dimColor>↑↓ Navigate · Enter Select · q Quit</Text>
        ) : (
          <Text dimColor>Type 1-{MENU_OPTIONS.length} to select · q Quit</Text>
        )}
      </Box>
    </Box>
  );
};
