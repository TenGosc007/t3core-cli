import type { GameEngine } from "../engine/gameEngine";
import type { HistoryMoveResult } from "../engine/gameEngine";
import type { UIState } from "../reducers/gameReducer";
import type { GameCommands } from "./useGameViewModel";

import { useInput, type Key } from "ink";

import { beep } from "@/services/settings";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { useGameViewModel } from "./useGameViewModel";

export function useGameInput(engine: GameEngine) {
  const { gameState, ui, commands } = useGameViewModel(engine);
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  useInput((input, key) => {
    if (!engine.isRunning) {
      if (key.return) commands.reset();
      return;
    }

    if (!arrowNav) return;

    if (input === "i") {
      commands.toggleInfo();
      return;
    }

    if (input === "h" && engine.movesCount > 0) {
      commands.toggleHistory();
      return;
    }

    if (ui.historyMode) {
      const status = parseHistoryInput(input, commands);
      if (status === "success") {
        beep();
        commands.toggleHistory();
      }
      return;
    }

    parseArrowInput(input, key, ui, commands);
  });

  return { gameState, ui, arrowNav, commands };
}

function parseArrowInput(
  input: string,
  key: Key,
  ui: UIState,
  commands: GameCommands,
) {
  if (key.upArrow) return commands.navigate("up");
  if (key.downArrow) return commands.navigate("down");
  if (key.leftArrow) return commands.navigate("left");
  if (key.rightArrow) return commands.navigate("right");

  if (key.return || input === " ") {
    commands.makeMove(ui.selectedCell);
  }
}

function parseHistoryInput(
  input: string,
  commands: GameCommands,
): HistoryMoveResult | undefined {
  const num = Number.parseInt(input, 10);
  if (!Number.isNaN(num)) {
    return commands.backToMove(num);
  }
}
