import { useInput } from "ink";
import { useState } from "react";

import { useNavigate } from "@/navigation";

import {
  DEFAULT_SETTINGS,
  SETTINGS_OPTIONS,
  type SettingsState,
} from "../constants/settingsOptions";

export const useSettingsInput = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);

  const toggleOption = (index: number) => {
    const option = SETTINGS_OPTIONS[index];
    if (!option || option.disabled?.(settings)) return;

    if (option.type === "command") {
      if (option.label === "Back to Menu") {
        navigate("/");
        return;
      }
      setSettings(DEFAULT_SETTINGS);
      return;
    }

    if (option.key) {
      setSettings((prev) => ({
        ...prev,
        [option.key!]: !prev[option.key!],
      }));
    }
  };

  useInput((input, key) => {
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

    if (input === "q") {
      navigate("/");
    }
  });

  return {
    selectedIndex,
    settings,
  };
};
