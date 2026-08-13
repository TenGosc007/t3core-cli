import type {
  HistoryMoveResult,
  MoveResult,
} from "../../engine/gameEngine";
import type { Direction } from "../../reducers/gameReducer";

export type GameCommands = {
  makeMove: (index: number) => MoveResult | undefined;
  backToMove: (index: number) => HistoryMoveResult | undefined;
  navigate: (direction: Direction) => void;
  navigateHistory: (direction: Direction) => void;
  toggleInfo: () => void;
  toggleHistory: () => void;
  reset: () => void;
};
