import type { GameEngine, GameSnapshot } from "../engine/gameEngine";

import { useSyncExternalStore } from "react";

export function useGameStore(engine: GameEngine): GameSnapshot {
  return useSyncExternalStore(engine.subscribe, engine.getSnapshot);
}
