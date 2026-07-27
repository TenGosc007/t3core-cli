import { render } from "ink-testing-library";
import React from "react";

import { Board } from "./src/features/Game/components/Board";
import { createGameEngine } from "./src/features/Game/engine/gameEngine";

const cases = [
  { label: "no selection", selectedCell: -1 },
  { label: "cell 0 selected", selectedCell: 0 },
  { label: "cell 4 selected", selectedCell: 4 },
];

for (const { label, selectedCell } of cases) {
  const game = createGameEngine();
  const { lastFrame } = render(
    React.createElement(Board, {
      board: game.board,
      selectedCell,
    }),
  );
  console.log(`\n=== ${label} ===`);
  console.log(lastFrame());
}

const gameWithMoves = createGameEngine();
gameWithMoves.savePlayerMove(0);
gameWithMoves.savePlayerMove(1);
const { lastFrame: lastFrameMoves } = render(
  React.createElement(Board, {
    board: gameWithMoves.board,
    selectedCell: 2,
  }),
);
console.log("\n=== after moves ===");
console.log(lastFrameMoves());
