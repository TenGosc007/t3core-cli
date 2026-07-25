import { Box } from "ink";

import { MENU_OPTIONS } from "../../constants/menuOptions";
import { MenuItem } from "../MenuItem/MenuItem";

type Props = {
  selectedIndex: number;
  arrowKeyNavigation: boolean;
};

export const MenuList = ({ selectedIndex, arrowKeyNavigation }: Props) => {
  return (
    <Box flexDirection="column" marginTop={1}>
      {MENU_OPTIONS.map((option, index) => (
        <MenuItem
          key={option.label}
          label={option.label}
          selected={arrowKeyNavigation && index === selectedIndex}
          arrowKeyNavigation={arrowKeyNavigation}
          index={index}
        />
      ))}
    </Box>
  );
};
