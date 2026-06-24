import type { IGameManager } from "./gameEngine.types";

import { T3CoreAdapter } from "./t3coreAdapter";

export class GameManager implements IGameManager {
  private engine: T3CoreAdapter;

  constructor() {
    this.engine = new T3CoreAdapter();
  }

  getGame(): T3CoreAdapter {
    return this.engine;
  }

  reset(): void {
    this.engine.reset();
  }

  createNew(): void {
    this.engine = new T3CoreAdapter();
  }
}

// Default singleton instance
export const gameManager = new GameManager();
