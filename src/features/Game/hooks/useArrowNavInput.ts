import type { UIState } from "../reducers/gameReducer";
import type { GameCommands } from "./useGameViewModel";

import { useInput } from "ink";

import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { INTERACTION_KEYS } from "../constants/gameConstants";

type Props = {
  ui: UIState;
  commands: GameCommands;
};

export const useArrowNavInput = ({ ui, commands }: Props) => {
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  useInput((input, key) => {
    if (!arrowNav) return;

    if (input === INTERACTION_KEYS.INFO) commands.toggleInfo();
    if (input === INTERACTION_KEYS.HISTORY) commands.toggleHistory();

    if (ui.historyMode) {
      const num = Number.parseInt(input, 10);
      if (!Number.isNaN(num)) {
        commands.backToMove(num);
      }
      return;
    }

    if (key.upArrow) return commands.navigate("up");
    if (key.downArrow) return commands.navigate("down");
    if (key.leftArrow) return commands.navigate("left");
    if (key.rightArrow) return commands.navigate("right");

    if (key.return || input === " ") {
      commands.makeMove(ui.selectedCell);
    }
  });
};
