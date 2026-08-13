import { useCallback } from "react";

import { useNavigate } from "@/navigation";
import { useSettingsStore } from "@/services/settings";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";
import { handleSettingsOption } from "./handleSettingsOption";

export const useSettingsToggleOption = () => {
  const beep = useSettingsStore((s) => s.beep);
  const arrowNav = useSettingsStore((s) => s.arrowNav);
  const showHistory = useSettingsStore((s) => s.showHistory);
  const navigate = useNavigate();
  const toggle = useSettingsStore((s) => s.toggle);
  const reset = useSettingsStore((s) => s.reset);
  const settings = { beep, arrowNav, showHistory };

  const toggleOption = useCallback(
    (index: number) =>
      handleSettingsOption(SETTINGS_OPTIONS[index], settings, {
        toggle,
        reset,
        navigate,
      }),
    [settings, toggle, reset, navigate],
  );

  return { toggleOption };
};
