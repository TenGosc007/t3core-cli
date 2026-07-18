import type { GameEngine } from "../engine/gameEngine";
import type { UIState } from "../reducers/gameReducer";
import type { GameCommands } from "./useGameViewModel";

import { useInput, type Key } from "ink";

import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { useGameViewModel } from "./useGameViewModel";

export function useGameInput(engine: GameEngine) {
  const { gameState, ui, commands } = useGameViewModel(engine);
  const arrowKeyNavigation = useSettingsStore((s) => s.arrowKeyNavigation);

  useInput((input, key) => {
    if (!engine.isRunning) {
      if (key.return) commands.reset();
      return;
    }

    if (input === "i") {
      commands.toggleInfo();
      return;
    }

    if (input === "h" && engine.movesCount > 0) {
      commands.toggleHistory();
      return;
    }

    if (ui.historyMode) {
      parseHistoryInput(input, key, ui, commands);
      return;
    }

    if (arrowKeyNavigation) {
      parseArrowInput(input, key, ui, commands);
    } else {
      parseNumberInput(input, commands);
    }
  });

  return { gameState, ui, arrowKeyNavigation };
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

function parseNumberInput(input: string, commands: GameCommands) {
  const num = Number.parseInt(input, 10);
  if (num >= 1 && num <= 9) {
    commands.makeMove(num - 1);
  }
}

function parseHistoryInput(
  input: string,
  key: Key,
  ui: UIState,
  commands: GameCommands,
) {
  if (key.return || input === " ") {
    commands.backToMove(ui.selectedCell);
    return;
  }

  const num = Number.parseInt(input, 10);
  if (!Number.isNaN(num)) {
    commands.backToMove(num);
  }
}
