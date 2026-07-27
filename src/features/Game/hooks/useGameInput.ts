import type { GameEngine } from "../engine/gameEngine";
import type { HistoryMoveResult } from "../engine/gameEngine";
import type { GameCommands } from "./useGameViewModel";

import { useInput, type Key } from "ink";

import { beep } from "@/services/settings";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { INTERACTION_KEYS } from "../constants/gameConstants";
import { useGameViewModel } from "./useGameViewModel";

export function useGameInput(engine: GameEngine) {
  const { gameState, ui, commands } = useGameViewModel(engine);
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  const makeInteraction = (input: string) => {
    if (input === INTERACTION_KEYS.INFO) commands.toggleInfo();
    if (input === INTERACTION_KEYS.HISTORY) commands.toggleHistory();
  };

  useInput((input, key) => {
    if (!engine.isRunning) {
      if (key.return) commands.reset();
      return;
    }

    if (!arrowNav) return;

    makeInteraction(input);

    if (ui.historyMode) {
      const status = parseHistoryInput(input, commands);
      if (status === "success") {
        beep();
        commands.toggleHistory();
      }
      return;
    }

    parseArrowInput(key, commands);

    if (key.return || input === " ") {
      commands.makeMove(ui.selectedCell);
    }
  });

  return { gameState, ui, arrowNav, commands, makeInteraction };
}

function parseArrowInput(key: Key, commands: GameCommands) {
  if (key.upArrow) return commands.navigate("up");
  if (key.downArrow) return commands.navigate("down");
  if (key.leftArrow) return commands.navigate("left");
  if (key.rightArrow) return commands.navigate("right");
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
