import { getGame } from "@/features/game/services/gameSession";
import { s } from "@/utils/styledLabel";

const BOARD_SIZE = 9;

export const validatePlayerEntry = (index: number) => {
  const isFieldOutOfRange = index < 0 || index > BOARD_SIZE - 1;
  if (isNaN(index) || isFieldOutOfRange) {
    console.log(s.red("Please enter a valid number (1-9) and press enter"));
    console.log(`\t`);
    return false;
  }

  if (getGame().isFieldSelectedByIndex(index)) {
    console.log(s.red("Field already selected"));
    console.log(`\t`);
    return false;
  }

  return true;
};

export const validateGameHistoryEntry = (index: number) => {
  const game = getGame();
  const movesCount = game.movesCount;
  const isFieldOutOfRange = index < 0 || index > movesCount;
  if (isNaN(index) || isFieldOutOfRange) {
    console.log(
      s.red(`Please enter a valid number (1-${movesCount}) and press enter`),
    );
    return false;
  }

  return true;
};
