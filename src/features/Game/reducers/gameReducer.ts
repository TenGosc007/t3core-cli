import { getArrowNavState } from "@/services/settings";

import { BOARD_SIZE, INITIAL_BOARD_POSITION } from "../constants/gameConstants";

export type Direction = "up" | "down" | "left" | "right";

export type UIState = {
  selectedCell: number;
  showInfo: boolean;
  historyMode: boolean;
  inputError: string | null;
  historySelectedIndex: number;
};

export type UIAction =
  | { type: "NAVIGATE"; direction: Direction }
  | { type: "NAVIGATE_HISTORY"; direction: Direction; count: number }
  | { type: "TOGGLE_INFO" }
  | { type: "TOGGLE_HISTORY" }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET" };

export const createInitialUIState = (): UIState => ({
  selectedCell: getArrowNavState() ? INITIAL_BOARD_POSITION : -1,
  showInfo: false,
  historyMode: false,
  inputError: null,
  historySelectedIndex: 0,
});

const navigate = (current: number, direction: Direction): number => {
  const row = Math.floor(current / BOARD_SIZE);
  const col = current % BOARD_SIZE;

  switch (direction) {
    case "up":
      return ((row - 1 + BOARD_SIZE) % BOARD_SIZE) * BOARD_SIZE + col;
    case "down":
      return ((row + 1) % BOARD_SIZE) * BOARD_SIZE + col;
    case "left":
      return row * BOARD_SIZE + ((col - 1 + BOARD_SIZE) % BOARD_SIZE);
    case "right":
      return row * BOARD_SIZE + ((col + 1) % BOARD_SIZE);
  }
};

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "NAVIGATE":
      return {
        ...state,
        selectedCell: navigate(state.selectedCell, action.direction),
        inputError: null,
      };

    case "TOGGLE_INFO":
      return { ...state, showInfo: !state.showInfo, inputError: null };

    case "TOGGLE_HISTORY":
      return {
        ...state,
        historyMode: !state.historyMode,
        inputError: null,
        historySelectedIndex: 0,
      };

    case "NAVIGATE_HISTORY": {
      const { direction, count } = action;
      if (direction !== "up" && direction !== "down") return state;
      const next =
        direction === "up"
          ? (state.historySelectedIndex - 1 + count) % count
          : (state.historySelectedIndex + 1) % count;
      return { ...state, historySelectedIndex: next };
    }

    case "SET_ERROR":
      return { ...state, inputError: action.error };

    case "RESET":
      return createInitialUIState();

    default:
      return state;
  }
};
