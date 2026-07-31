import type { MenuOption } from "./constants/menuOptions";

import { useCallback } from "react";

import { NavList } from "@/components/NavList";

import { MenuItem } from "./components/MenuItem/MenuItem";
import { MENU_OPTIONS } from "./constants/menuOptions";
import { useMenuInput } from "./hooks/useMenuInput";

export const Menu = () => {
  const { selectedIndex, arrowNav } = useMenuInput();

  const renderItem = useCallback(
    (option: MenuOption, index: number) => (
      <MenuItem
        label={option.label}
        selected={arrowNav && index === selectedIndex}
      />
    ),
    [arrowNav, selectedIndex],
  );

  return (
    <NavList
      style={{ marginTop: 1 }}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      data={MENU_OPTIONS}
      keyExtractor={(option) => option.label}
      renderItem={renderItem}
    />
  );
};
