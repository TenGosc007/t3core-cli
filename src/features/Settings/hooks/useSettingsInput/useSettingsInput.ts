import { useInput } from "ink";
import { useState } from "react";

import {
  useSettingsArrowNav,
  useSettingsShowHistory,
  useSettingsStore,
} from "@/services/settings/useSettingsStore";

import { SETTINGS_OPTIONS } from "../../constants/settingsOptions";
import { useSettingsToggleOption } from "../useSettingsToggleOption";
import { handleSettingsInput, wrapIndex } from "./handleSettingsInput";

export const useSettingsInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleOption } = useSettingsToggleOption();

  const beep = useSettingsStore((s) => s.beep);
  const arrowNav = useSettingsArrowNav();
  const showHistory = useSettingsShowHistory();
  const settings = { beep, arrowNav, showHistory };

  useInput((_, key) => {
    const result = handleSettingsInput(key, arrowNav);
    if (result.type === "navigate") {
      setSelectedIndex((prev) =>
        wrapIndex(prev, SETTINGS_OPTIONS.length, result.direction),
      );
    } else if (result.type === "select") {
      toggleOption(selectedIndex);
    }
  });

  return {
    selectedIndex,
    settings,
    arrowNav,
  };
};
