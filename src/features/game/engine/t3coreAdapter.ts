import type { GameEngine } from "./gameEngine.types";

import { Game } from "t3core";

/**
 * T3Core implementation of GameEngine interface
 * Acts as an adapter over the t3core Game class
 */
export class T3CoreAdapter implements GameEngine {
  private readonly _game: Game;

  constructor(game: Game = new Game()) {
    this._game = game;
  }

  getCurrentPlayer() {
    return this._game.currentPlayer;
  }

  getBoard() {
    return [...this._game.board];
  }

  getStatus() {
    return this._game.gameStatus;
  }

  getMovesCount(): number {
    return this._game.movesCount;
  }

  makeMove(index: number): boolean {
    const status = this._game.savePlayerMove(index);
    return status === "success";
  }

  reset(): void {
    this._game.reset();
  }

  backToMove(moveIndex: number): void {
    this._game.backToMove(moveIndex);
  }

  isFieldOccupied(index: number): boolean {
    return this._game.isFieldSelectedByIndex(index);
  }

  isGameOver(): boolean {
    return this.getStatus().status !== "running";
  }
}
