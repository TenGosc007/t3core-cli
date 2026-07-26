import { useState } from "react";

import { type GameEngine, createGameEngine } from "../engine/gameEngine";

export const useGameEngine = (): GameEngine => {
  const [engine] = useState(createGameEngine);

  return engine;
};
