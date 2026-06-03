import { getGame } from "@/features/game/services/gameSession";
import { styledLabel } from "@/utils/styledLabel";

const BOARD_SIZE = 9;

export const validatePlayerEntry = (index: number) => {
  const isFieldOutOfRange = index < 0 || index > BOARD_SIZE - 1;
  if (isNaN(index) || isFieldOutOfRange) {
    console.log(
      styledLabel("Please enter a valid number (1-9) and press enter", {
        color: "red",
      }),
    );
    console.log(`\t`);
    return false;
  }

  if (getGame().isFieldSelectedByIndex(index)) {
    console.log(styledLabel("Field already selected", { color: "red" }));
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
      styledLabel(
        `Please enter a valid number (1-${movesCount}) and press enter`,
        {
          color: "red",
        },
      ),
    );
    return false;
  }

  return true;
};
