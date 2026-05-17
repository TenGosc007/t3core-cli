import { getGame } from "@/features/game/services/gameSession";

const BOARD_SIZE = 9;

export const validatePlayerEntry = (field: number) => {
  const isFieldOutOfRange = field < 1 || field > BOARD_SIZE;
  if (!field || isFieldOutOfRange) {
    console.log("Please enter a valid number (1-9) and press enter");
    return false;
  }

  if (getGame().isFieldSelected(field)) {
    console.log("Field already selected");
    return false;
  }

  return true;
};
