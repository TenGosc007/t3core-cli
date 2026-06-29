import type { GameEngine } from "../engine/gameEngine";

import { useInput, type Key } from "ink";
import { useReducer } from "react";

import { ROUTES, useNavigate } from "@/navigation";
import { useSettingsStore } from "@/services/settings/useSettingsStore";

import {
  createInitialUIState,
  uiReducer,
  type UIAction,
  type UIState,
} from "../reducers/gameReducer";
import { validateMove } from "../validation";
import { useGameStore } from "./useGameStore";

type Dispatch = React.Dispatch<UIAction>;

export function useGameInput(engine: GameEngine) {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);
  const arrowKeyNavigation = useSettingsStore((s) => s.arrowKeyNavigation);
  const navigate = useNavigate();

  const isGameOver = !engine.isRunning;

  useInput((input, key) => {
    if (input === "q") {
      navigate(ROUTES.home);
      return;
    }

    if (isGameOver) {
      if (key.return) {
        engine.reset();
        dispatch({ type: "RESET" });
      }
      return;
    }

    if (input === "i") {
      dispatch({ type: "TOGGLE_INFO" });
      return;
    }

    if (input === "h" && engine.movesCount > 0) {
      dispatch({ type: "TOGGLE_HISTORY" });
      return;
    }

    if (ui.historyMode) {
      handleHistoryInput(input, key, engine, ui, dispatch);
      return;
    }

    if (arrowKeyNavigation) {
      handleArrowInput(input, key, engine, ui, dispatch);
    } else {
      handleNumberInput(input, engine, dispatch);
    }
  });

  return { gameState, ui };
}

function handleArrowInput(
  input: string,
  key: Key,
  engine: GameEngine,
  ui: UIState,
  dispatch: Dispatch,
) {
  if (key.upArrow) {
    dispatch({ type: "NAVIGATE", direction: "up" });
    return;
  }
  if (key.downArrow) {
    dispatch({ type: "NAVIGATE", direction: "down" });
    return;
  }
  if (key.leftArrow) {
    dispatch({ type: "NAVIGATE", direction: "left" });
    return;
  }
  if (key.rightArrow) {
    dispatch({ type: "NAVIGATE", direction: "right" });
    return;
  }

  if (key.return || input === " ") {
    const error = validateMove({
      index: ui.selectedCell,
      game: engine,
      isHistoryMode: false,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
    } else {
      engine.savePlayerMove(ui.selectedCell);
      dispatch({ type: "SET_ERROR", error: null });
    }
  }
}

function handleNumberInput(
  input: string,
  engine: GameEngine,
  dispatch: Dispatch,
) {
  const num = Number.parseInt(input, 10);
  if (num >= 1 && num <= 9) {
    const index = num - 1;
    const error = validateMove({
      index,
      game: engine,
      isHistoryMode: false,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
    } else {
      engine.savePlayerMove(index);
      dispatch({ type: "SET_ERROR", error: null });
    }
  }
}

function handleHistoryInput(
  input: string,
  key: Key,
  engine: GameEngine,
  ui: UIState,
  dispatch: Dispatch,
) {
  if (key.return || input === " ") {
    const error = validateMove({
      index: ui.selectedCell,
      game: engine,
      isHistoryMode: true,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
    } else {
      engine.backToMove(ui.selectedCell);
      dispatch({ type: "SET_ERROR", error: null });
    }
    return;
  }

  const num = Number.parseInt(input, 10);
  if (!Number.isNaN(num)) {
    const error = validateMove({
      index: num,
      game: engine,
      isHistoryMode: true,
    });
    if (error) {
      dispatch({ type: "SET_ERROR", error });
    } else {
      engine.backToMove(num);
      dispatch({ type: "SET_ERROR", error: null });
    }
  }
}
