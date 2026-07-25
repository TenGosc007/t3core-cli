import { Box, Text } from "ink";

import { MenuList } from "./components/MenuList";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex, arrowKeyNavigation } = useMenuInput();

  return (
    <>
      <MenuList
        selectedIndex={selectedIndex}
        arrowKeyNavigation={arrowKeyNavigation}
      />

      {arrowKeyNavigation && (
        <Box marginTop={2}>
          <Text dimColor>↑↓ Navigate · Enter Select</Text>
        </Box>
      )}
    </>
  );
};
