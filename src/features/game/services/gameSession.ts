import { Game } from "t3core";

let game: Game | null = null;

export const getGame = () => {
  if (!game) {
    game = new Game();
  }
  return game;
};

export const setGame = (newGame: Game) => {
  game = newGame;
};

export const clearGame = () => {
  game = null;
};

export const resetGame = () => {
  getGame().reset();
};
