import { Box, Text } from "ink";

import { MenuList } from "./components/MenuList";
import { MENU_OPTIONS } from "./constants/menuOptions";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex, arrowKeyNavigation } = useMenuInput();

  return (
    <Box flexDirection="column">
      <MenuList selectedIndex={selectedIndex} />
      <Box marginTop={1}>
        {arrowKeyNavigation ? (
          <Text dimColor>↑↓ Navigate · Enter Select</Text>
        ) : (
          <Text dimColor>Type 1-{MENU_OPTIONS.length} to select · q Quit</Text>
        )}
      </Box>
    </Box>
  );
};
