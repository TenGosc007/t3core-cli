import { useInput } from "ink";
import { useState } from "react";

import { useNavigate } from "@/navigation";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";

export const useSettingsInput = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const settings = useSettingsStore();
  const toggle = useSettingsStore((s) => s.toggle);
  const reset = useSettingsStore((s) => s.reset);

  const toggleOption = (index: number) => {
    const option = SETTINGS_OPTIONS[index];
    if (!option || option.disabled?.(settings)) return;

    if (option.type === "command") {
      if (option.label === "Back to Menu") {
        navigate("/");
        return;
      }
      reset();
      return;
    }

    if (option.type === "toggle" && option.key) {
      toggle(option.key);
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
