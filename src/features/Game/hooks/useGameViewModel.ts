import type {
  GameEngine,
  HistoryMoveResult,
  MoveResult,
} from "../engine/gameEngine";
import type { Direction } from "../reducers/gameReducer";

import { useCallback, useMemo, useReducer } from "react";

import { beep } from "@/services/settings";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { INTERACTION_KEYS } from "../constants/gameConstants";
import { createInitialUIState, uiReducer } from "../reducers/gameReducer";
import { validateMove } from "../validation/validateMove";
import { useGameStore } from "./useGameStore";

export type GameCommands = {
  makeMove: (index: number) => MoveResult | undefined;
  backToMove: (index: number) => HistoryMoveResult | undefined;
  navigate: (direction: Direction) => void;
  navigateHistory: (direction: Direction) => void;
  toggleInfo: () => void;
  toggleHistory: () => void;
  reset: () => void;
};

export const useGameViewModel = (engine: GameEngine) => {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);

  const reset = useCallback(() => {
    engine.reset();
    dispatch({ type: "RESET" });
  }, [engine]);

  const toggleHistory = useCallback(() => {
    if (!useSettingsStore.getState().showHistory) {
      dispatch({ type: "SET_ERROR", error: "History is disabled" });
      return;
    }
    if (engine.movesCount > 0) {
      beep();
      dispatch({ type: "TOGGLE_HISTORY" });
      return;
    }

    dispatch({ type: "SET_ERROR", error: "No moves to view" });
  }, [engine]);

  const toggleInfo = useCallback(() => {
    dispatch({ type: "TOGGLE_INFO" });
  }, []);

  const makeMove = useCallback(
    (index: number) => {
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
    },
    [engine, ui.historyMode, reset],
  );

  const backToMove = useCallback(
    (index: number) => {
      const status = engine.backToMove(index);
      if (status === "success") {
        toggleHistory();
        return status;
      }
      dispatch({ type: "SET_ERROR", error: null });
      return status;
    },
    [engine, toggleHistory],
  );

  const navigate = useCallback(
    (direction: Direction) => dispatch({ type: "NAVIGATE", direction }),
    [],
  );

  const navigateHistory = useCallback(
    (direction: Direction) =>
      dispatch({
        type: "NAVIGATE_HISTORY",
        direction,
        count: engine.movesCount + 1,
      }),
    [engine.movesCount],
  );

  const makeInteraction = useCallback(
    (input: string) => {
      if (input === INTERACTION_KEYS.INFO) toggleInfo();
      if (input === INTERACTION_KEYS.HISTORY) toggleHistory();
    },
    [toggleInfo, toggleHistory],
  );

  const commands: GameCommands = useMemo(
    () => ({
      makeMove,
      backToMove,
      navigate,
      navigateHistory,
      toggleInfo,
      toggleHistory,
      reset,
    }),
    [
      makeMove,
      backToMove,
      navigate,
      navigateHistory,
      toggleInfo,
      toggleHistory,
      reset,
    ],
  );

  return { gameState, ui, commands, makeInteraction };
};
