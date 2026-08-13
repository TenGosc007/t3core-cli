import { useInput } from "ink";
import { useState } from "react";

import { useExitAppStore } from "@/services/app";
import { useSettingsArrowNav } from "@/services/settings/useSettingsStore";

import { MENU_OPTIONS } from "../../constants/menuOptions";
import { useMenuNavigation } from "../useMenuNavigation";
import { handleMenuInput, wrapIndex } from "./handleMenuInput";

export const useMenuInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const arrowNav = useSettingsArrowNav();
  const { navigateToMenuOption } = useMenuNavigation();
  const confirming = useExitAppStore((s) => s.confirming);

  useInput((_, key) => {
    const result = handleMenuInput(key, arrowNav && !confirming);
    if (result.type === "navigate") {
      setSelectedIndex((prev) =>
        wrapIndex(prev, MENU_OPTIONS.length, result.direction),
      );
    }
    if (result.type === "select") {
      navigateToMenuOption(selectedIndex);
    }
  });

  return {
    selectedIndex,
    arrowNav,
  };
};
