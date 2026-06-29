import type { GameEngine } from "../engine/gameEngine";
import type { GameEventPayload } from "t3core";

import { useSyncExternalStore } from "react";

export function useGameStore(engine: GameEngine): GameEventPayload {
  return useSyncExternalStore(engine.subscribe, engine.getSnapshot);
}
