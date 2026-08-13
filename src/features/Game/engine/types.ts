export type PlayerSymbol = string;

export type BoardField = number | PlayerSymbol;

export type BoardSnapshot = readonly BoardField[];

export type GameStatus =
  | { status: "running" }
  | { status: "draw" }
  | { status: "win"; winner: PlayerSymbol };

export type GameSnapshot = {
  board: BoardSnapshot;
  currentPlayer: PlayerSymbol;
  gameStatus: GameStatus;
};

export type MoveResult =
  | "success"
  | "already_selected"
  | "game_not_running"
  | "invalid_index";

export type HistoryMoveResult = "success" | "invalid_history_index";

export const DEFAULT_SYMBOLS: readonly [PlayerSymbol, PlayerSymbol] = [
  "O",
  "X",
];
