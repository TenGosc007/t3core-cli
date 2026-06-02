import { getGame } from "@/features/game/services/gameSession";

const BOARD_SIZE = 9;

export const validatePlayerEntry = (index: number) => {
  const isFieldOutOfRange = index < 0 || index > BOARD_SIZE - 1;
  if (isNaN(index) || isFieldOutOfRange) {
    console.log("Please enter a valid number (1-9) and press enter");
    return false;
  }

  if (getGame().isFieldSelectedByIndex(index)) {
    console.log("Field already selected");
    return false;
  }

  return true;
};
