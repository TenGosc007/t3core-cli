import { useInput } from "ink";
import { useState } from "react";

import { useExitAppStore } from "@/services/app";
import { useSettingsArrowNav } from "@/services/settings/useSettingsStore";

import { MENU_OPTIONS } from "../constants/menuOptions";
import { useMenuNavigation } from "./useMenuNavigation";

export const useMenuInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const arrowNav = useSettingsArrowNav();
  const { navigateToMenuOption } = useMenuNavigation();
  const { confirming } = useExitAppStore();

  useInput((_, key) => {
    if (!arrowNav || confirming) {
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
    arrowNav,
  };
};
