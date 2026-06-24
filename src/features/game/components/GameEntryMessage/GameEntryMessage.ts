import { GameEntryMessageUI } from "@/features/game/components/ui/GameEntryMessageUI";
import { gameState } from "@/features/game/services/gameState";

export const GameEntryMessage = () => {
  GameEntryMessageUI({ showInfo: gameState.info });
};
