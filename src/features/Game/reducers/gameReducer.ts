import {
  BOARD_COLS,
  BOARD_ROWS,
  INITIAL_BOARD_POSITION,
} from "../constants/gameConstants";

export type Direction = "up" | "down" | "left" | "right";

export type UIState = {
  selectedCell: number;
  showInfo: boolean;
  historyMode: boolean;
  inputError: string | null;
};

export type UIAction =
  | { type: "NAVIGATE"; direction: Direction }
  | { type: "TOGGLE_INFO" }
  | { type: "TOGGLE_HISTORY" }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET" };

export const createInitialUIState = (): UIState => ({
  selectedCell: INITIAL_BOARD_POSITION,
  showInfo: false,
  historyMode: false,
  inputError: null,
});

const navigate = (current: number, direction: Direction): number => {
  const row = Math.floor(current / BOARD_COLS);
  const col = current % BOARD_COLS;

  switch (direction) {
    case "up":
      return ((row - 1 + BOARD_ROWS) % BOARD_ROWS) * BOARD_COLS + col;
    case "down":
      return ((row + 1) % BOARD_ROWS) * BOARD_COLS + col;
    case "left":
      return row * BOARD_COLS + ((col - 1 + BOARD_COLS) % BOARD_COLS);
    case "right":
      return row * BOARD_COLS + ((col + 1) % BOARD_COLS);
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
      return { ...state, historyMode: !state.historyMode, inputError: null };

    case "SET_ERROR":
      return { ...state, inputError: action.error };

    case "RESET":
      return createInitialUIState();

    default:
      return state;
  }
};
