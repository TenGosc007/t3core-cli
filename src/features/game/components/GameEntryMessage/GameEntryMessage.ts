import { gameState } from "../../services/gameState";
import { GameEntryMessageUI } from "../ui/GameEntryMessageUI";

export const GameEntryMessage = () => {
  GameEntryMessageUI({ showInfo: gameState.info });
};
