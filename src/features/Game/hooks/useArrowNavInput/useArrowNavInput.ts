import type { UIState } from "../../reducers/gameReducer";
import type { GameCommands } from "../useGameViewModel/types";

import { useInput } from "ink";

import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { handleArrowNavInput } from "./handleArrowNavInput";

type Props = {
  ui: UIState;
  commands: GameCommands;
};

export const useArrowNavInput = ({ ui, commands }: Props) => {
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  useInput((input, key) => {
    if (arrowNav) handleArrowNavInput(input, key, ui, commands);
  });
};
