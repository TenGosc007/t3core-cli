import type { GameEngine } from "../../engine/gameEngine";
import type { Direction, UIAction, UIState } from "../../reducers/gameReducer";
import type { GameCommands } from "./types";
import type { Dispatch } from "react";

import { useCallback } from "react";

import { beep } from "@/services/settings";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import { validateMove } from "../../validation/validateMove";

type UseGameCommandsProps = {
  engine: GameEngine;
  ui: UIState;
  dispatch: Dispatch<UIAction>;
};

export const useGameCommands = ({
  engine,
  ui,
  dispatch,
}: UseGameCommandsProps): GameCommands => {
  const reset = useCallback(() => {
    engine.reset();
    dispatch({ type: "RESET" });
  }, [engine, dispatch]);

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
  }, [engine, dispatch]);

  const toggleInfo = useCallback(
    () => dispatch({ type: "TOGGLE_INFO" }),
    [dispatch],
  );

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
    [engine, ui.historyMode, reset, dispatch],
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
    [engine, toggleHistory, dispatch],
  );

  const navigate = useCallback(
    (direction: Direction) => dispatch({ type: "NAVIGATE", direction }),
    [dispatch],
  );

  const navigateHistory = useCallback(
    (direction: Direction) =>
      dispatch({
        type: "NAVIGATE_HISTORY",
        direction,
        count: engine.movesCount + 1,
      }),
    [engine.movesCount, dispatch],
  );

  return {
    makeMove,
    backToMove,
    navigate,
    navigateHistory,
    toggleInfo,
    toggleHistory,
    reset,
  };
};
