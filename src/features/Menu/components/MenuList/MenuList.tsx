import { NavList } from "@/components/NavList";

import { MENU_OPTIONS } from "../../constants/menuOptions";
import { MenuItem } from "../MenuItem/MenuItem";

type Props = {
  selectedIndex: number;
  arrowNav: boolean;
};

export const MenuList = ({ selectedIndex, arrowNav }: Props) => {
  return (
    <NavList
      style={{ marginTop: 1 }}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      data={MENU_OPTIONS}
      keyExtractor={(option) => option.label}
      renderItem={(option, index) => (
        <MenuItem
          label={option.label}
          selected={arrowNav && index === selectedIndex}
          arrowNav={arrowNav}
          index={index}
        />
      )}
    />
  );
};
