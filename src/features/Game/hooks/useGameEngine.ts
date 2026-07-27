import { useState } from "react";

import { type GameEngine, createGameEngine } from "../engine/gameEngine";

export const useGameEngine = (): GameEngine => {
  // Lazy init — engine is created once and persisted for the component's lifetime
  const [engine] = useState(createGameEngine);

  return engine;
};
