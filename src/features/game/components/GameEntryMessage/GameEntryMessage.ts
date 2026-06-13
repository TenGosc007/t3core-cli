import { s } from "@/utils/styledLabel";

import { gameState } from "../../services/gameState";

export const GameEntryMessage = () => {
  const border = s.yellow("--------------------------------------------");

  console.log(border);
  const gameEntryMessage = s.grey.italic(
    `Tic-tac-toe is a simple two-player game 
played on a 3×3 grid. Players take turns 
marking a square with X or O, trying to get 
three in a row horizontally, vertically, 
or diagonally. 

The game ends when one player wins or all 
squares are filled, resulting in a draw.

Press "i" to hide game info`,
  );

  if (gameState.info) console.log(gameEntryMessage);
  else console.log(s.dim('Press "i" to show game info'));

  console.log(border);
  console.log(`\t`);
};
