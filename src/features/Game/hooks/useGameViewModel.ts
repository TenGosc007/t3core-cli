import type { GameEngine } from "../engine/gameEngine";
import type { Direction } from "../reducers/gameReducer";

import { useReducer } from "react";

import { beep } from "@/services/settings";

import { createInitialUIState, uiReducer } from "../reducers/gameReducer";
import { validateMove } from "../validation";
import { useGameStore } from "./useGameStore";

export type GameCommands = {
  makeMove: (index: number) => void;
  backToMove: (index: number) => boolean;
  navigate: (direction: Direction) => void;
  toggleInfo: () => void;
  toggleHistory: () => void;
  reset: () => void;
};

export const useGameViewModel = (engine: GameEngine) => {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);

  const makeMove = (index: number) => {
    const error = validateMove({
      index,
      game: engine,
      isHistoryMode: ui.historyMode,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
      return;
    }
    engine.savePlayerMove(index);
    dispatch({ type: "SET_ERROR", error: null });
    beep();
  };

  const backToMove = (index: number) => {
    const error = validateMove({
      index,
      game: engine,
      isHistoryMode: true,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
      return false;
    }
    engine.backToMove(index);
    dispatch({ type: "SET_ERROR", error: null });
    return true;
  };

  const navigate = (direction: Direction) =>
    dispatch({ type: "NAVIGATE", direction });

  const toggleInfo = () => dispatch({ type: "TOGGLE_INFO" });

  const toggleHistory = () => dispatch({ type: "TOGGLE_HISTORY" });

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

  return { gameState, ui, commands };
};
