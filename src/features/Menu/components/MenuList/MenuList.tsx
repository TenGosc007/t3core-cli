import { Box } from "ink";

import { MENU_OPTIONS } from "../../constants/menuOptions";
import { MenuItem } from "../MenuItem/MenuItem";

type Props = {
  selectedIndex: number;
};

export const MenuList = ({ selectedIndex }: Props) => {
  return (
    <Box flexDirection="column" marginTop={1}>
      {MENU_OPTIONS.map((option, index) => (
        <MenuItem
          key={option.label}
          label={option.label}
          selected={index === selectedIndex}
        />
      ))}
    </Box>
  );
};
