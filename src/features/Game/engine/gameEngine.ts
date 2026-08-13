import type {
  BoardSnapshot,
  GameSnapshot,
  GameStatus,
  HistoryMoveResult,
  MoveResult,
  PlayerSymbol,
} from "./types";

import { Game, GameEvent } from "t3core";

export {
  DEFAULT_SYMBOLS,
  type BoardField,
  type BoardSnapshot,
  type GameSnapshot,
  type GameStatus,
  type HistoryMoveResult,
  type MoveResult,
  type PlayerSymbol,
} from "./types";

export type GameEngine = {
  readonly snapshot: GameSnapshot;
  readonly board: BoardSnapshot;
  readonly currentPlayer: PlayerSymbol;
  readonly gameStatus: GameStatus;
  readonly movesCount: number;
  readonly isRunning: boolean;
  isFieldSelectedByIndex: (index: number) => boolean;
  savePlayerMove: (index: number) => MoveResult;
  backToMove: (index: number) => HistoryMoveResult;
  reset: () => void;
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => GameSnapshot;
};

export const createGameEngine = (game: Game = new Game()): GameEngine => {
  return {
    get snapshot() {
      return game.snapshot;
    },
    get board() {
      return game.board;
    },
    get currentPlayer() {
      return game.currentPlayer;
    },
    get gameStatus() {
      return game.gameStatus;
    },
    get movesCount() {
      return game.movesCount;
    },
    get isRunning() {
      return game.gameStatus.status === "running";
    },

    isFieldSelectedByIndex: (index) => {
      return game.isFieldSelectedByIndex(index);
    },
    savePlayerMove: (index) => {
      return game.savePlayerMove(index);
    },
    backToMove: (index) => {
      return game.backToMove(index);
    },
    reset: () => {
      game.reset();
    },

    subscribe: (callback) => {
      game.on(GameEvent.STATE_CHANGE, callback);
      return () => {
        game.off(GameEvent.STATE_CHANGE, callback);
      };
    },
    getSnapshot: () => game.snapshot,
  };
};
