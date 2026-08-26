import { useInput } from "ink";
import { useState } from "react";

import { useExitAppStore } from "@/services/app";
import { useSettingsArrowNav } from "@/services/settings";
import { handleArrowNavInput, wrapIndex } from "@/utils/arrowNav";

import { GAME_MODE_OPTIONS } from "../../constants/gameModeOptions";
import { useGameModeNavigation } from "../useGameModeNavigation";

export const useGameModeInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const arrowNav = useSettingsArrowNav();
  const { navigateToGameMode } = useGameModeNavigation();
  const confirming = useExitAppStore((s) => s.confirming);

  useInput((_, key) => {
    const result = handleArrowNavInput(key, arrowNav && !confirming);
    if (result.type === "navigate") {
      setSelectedIndex((prev) =>
        wrapIndex(prev, GAME_MODE_OPTIONS.length, result.direction),
      );
    }
    if (result.type === "select") {
      navigateToGameMode(selectedIndex);
    }
  });

  return {
    selectedIndex,
    arrowNav,
  };
};
