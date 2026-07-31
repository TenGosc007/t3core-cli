import { useNavigate } from "@/navigation";
import { useSettingsStore } from "@/services/settings";

import { SETTINGS_OPTIONS } from "../constants/settingsOptions";

export const useSettingsToggleOption = () => {
  const beep = useSettingsStore((s) => s.beep);
  const arrowNav = useSettingsStore((s) => s.arrowNav);
  const showHistory = useSettingsStore((s) => s.showHistory);
  const navigate = useNavigate();
  const toggle = useSettingsStore((s) => s.toggle);
  const reset = useSettingsStore((s) => s.reset);
  const settings = { beep, arrowNav, showHistory };

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

  return { toggleOption };
};
