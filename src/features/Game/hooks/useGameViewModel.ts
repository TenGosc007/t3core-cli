import type {
  GameEngine,
  HistoryMoveResult,
  MoveResult,
} from "../engine/gameEngine";
import type { Direction } from "../reducers/gameReducer";

import { useReducer } from "react";

import { beep } from "@/services/settings";

import { INTERACTION_KEYS } from "../constants/gameConstants";
import { createInitialUIState, uiReducer } from "../reducers/gameReducer";
import { validateMove } from "../validation/validateMove";
import { useGameStore } from "./useGameStore";

export type GameCommands = {
  makeMove: (index: number) => MoveResult | undefined;
  backToMove: (index: number) => HistoryMoveResult | undefined;
  navigate: (direction: Direction) => void;
  toggleInfo: () => void;
  toggleHistory: () => void;
  reset: () => void;
};

export const useGameViewModel = (engine: GameEngine) => {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);

  const makeMove = (index: number) => {
    if (!engine.isRunning) {
      reset();
      return;
    }

    const error = validateMove({
      index,
      game: engine,
      isHistoryMode: ui.historyMode,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
      return;
    }
    const status = engine.savePlayerMove(index);
    dispatch({ type: "SET_ERROR", error: null });
    beep();
    return status;
  };

  const makeInteraction = (input: string) => {
    if (input === INTERACTION_KEYS.INFO) toggleInfo();
    if (input === INTERACTION_KEYS.HISTORY) toggleHistory();
  };

  const backToMove = (index: number) => {
    const status = engine.backToMove(index);
    if (status === "success") {
      toggleHistory();
      return status;
    }
    dispatch({ type: "SET_ERROR", error: null });
    return status;
  };

  const navigate = (direction: Direction) =>
    dispatch({ type: "NAVIGATE", direction });

  const toggleInfo = () => {
    dispatch({ type: "TOGGLE_INFO" });
  };

  const toggleHistory = () => {
    if (engine.movesCount > 0) {
      beep();
      dispatch({ type: "TOGGLE_HISTORY" });
      return;
    }

    dispatch({ type: "SET_ERROR", error: "No moves to view" });
  };

  const reset = () => {
    engine.reset();
    dispatch({ type: "RESET" });
  };

  const commands: GameCommands = {
    makeMove,
    backToMove,
    navigate,
    toggleInfo,
    toggleHistory,
    reset,
  };

  return { gameState, ui, commands, makeInteraction };
};
