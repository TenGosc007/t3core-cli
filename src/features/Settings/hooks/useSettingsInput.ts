import { useInput } from "ink";
import { useState } from "react";

import {
  useSettingsArrowNav,
  useSettingsStore,
} from "@/services/settings/useSettingsStore";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";
import { useSettingsToggleOption } from "./useSettingsToggleOption";

export const useSettingsInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleOption } = useSettingsToggleOption();

  const settings = useSettingsStore();
  const arrowNav = useSettingsArrowNav();

  useInput((_, key) => {
    if (!arrowNav) {
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(
        (prev) =>
          (prev - 1 + SETTINGS_OPTIONS.length) % SETTINGS_OPTIONS.length,
      );
    }

    if (key.downArrow) {
      setSelectedIndex((prev) => (prev + 1) % SETTINGS_OPTIONS.length);
    }

    if (key.return) {
      toggleOption(selectedIndex);
    }
  });

  return {
    selectedIndex,
    settings,
  };
};
