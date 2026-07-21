import {
  Game,
  GameEvent,
  type BoardSnapshot,
  type GameEventPayload,
  type GameStatus,
  type PlayerSymbol,
} from "t3core";

export type GameEngine = {
  readonly snapshot: GameEventPayload;
  readonly board: BoardSnapshot;
  readonly currentPlayer: PlayerSymbol;
  readonly gameStatus: GameStatus;
  readonly movesCount: number;
  readonly isRunning: boolean;
  isFieldSelectedByIndex: (index: number) => boolean;
  savePlayerMove: (index: number) => void;
  backToMove: (index: number) => boolean;
  reset: () => void;
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => GameEventPayload;
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
      game.savePlayerMove(index);
    },
    backToMove: (index) => {
      const status = game.backToMove(index);
      return status === "success";
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
