import { useInput } from "ink";
import { useState } from "react";

import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { MENU_OPTIONS } from "../constants/menuOptions";
import { useMenuNavigation } from "./navigateToMenuOption";

export const useMenuInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const arrowKeyNavigation = useSettingsStore((s) => s.arrowKeyNavigation);
  const navigateToMenuOption = useMenuNavigation();

  useInput((_, key) => {
    if (!arrowKeyNavigation) {
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(
        (prev) => (prev - 1 + MENU_OPTIONS.length) % MENU_OPTIONS.length,
      );
    }

    if (key.downArrow) {
      setSelectedIndex((prev) => (prev + 1) % MENU_OPTIONS.length);
    }

    if (key.return) {
      navigateToMenuOption(selectedIndex);
    }
  });

  return {
    selectedIndex,
    arrowKeyNavigation,
  };
};
