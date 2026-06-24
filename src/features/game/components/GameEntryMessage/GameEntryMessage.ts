import { GameEntryMessageUI } from "@/features/game/components/ui/GameEntryMessageUI";
import { gameStateManager } from "@/features/game/services/gameState";

export const GameEntryMessage = () => {
  GameEntryMessageUI({ showInfo: gameStateManager.info });
};
