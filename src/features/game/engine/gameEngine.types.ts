import type { BoardField, GameStatus } from "t3core";

export interface GameEngine {
  // Read operations
  getCurrentPlayer(): string;
  getBoard(): BoardField[];
  getStatus(): GameStatus;
  getMovesCount(): number;

  // Write operations
  makeMove(position: number): boolean;
  reset(): void;
  backToMove(moveIndex: number): void;

  // Validation
  isFieldOccupied(index: number): boolean;
  isGameOver(): boolean;
}

export interface GameEngineFactory {
  create(): GameEngine;
}

export interface IGameManager {
  getGame(): GameEngine;
  reset(): void;
  createNew(): void;
}
