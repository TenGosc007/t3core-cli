import type { IGameManager } from "./gameEngine.types";

import { T3CoreAdapter } from "./t3coreAdapter";

export class GameManager implements IGameManager {
  private _game: T3CoreAdapter;

  constructor() {
    this._game = new T3CoreAdapter();
  }

  getGame(): T3CoreAdapter {
    return this._game;
  }

  reset(): void {
    this._game.reset();
  }

  createNew(): void {
    this._game = new T3CoreAdapter();
  }
}

// Default singleton instance
export const gameManager = new GameManager();
