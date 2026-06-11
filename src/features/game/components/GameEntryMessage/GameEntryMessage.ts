import { s } from "@/utils/styledLabel";

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
squares are filled, resulting in a draw.`,
  );
  console.log(gameEntryMessage);
  console.log(border);
  console.log(`\t`);
};
