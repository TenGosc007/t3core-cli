import type { SettingsKey } from "@/services/settings/settings";

type Option = { id: string; label: string; key: SettingsKey };

export const SETTINGS_OPTIONS: Option[] = [
  { id: "1", label: "Sound", key: "beep" },
  { id: "2", label: "Style", key: "style" },
  { id: "3", label: "Use Arrow Keys", key: "arrowKeyNavigation" },
] as const;
