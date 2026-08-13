import type { GameEngine } from "../../engine/gameEngine";

import { useCallback, useReducer } from "react";

import { createInitialUIState, uiReducer } from "../../reducers/gameReducer";
import { useGameStore } from "../useGameStore";
import { handleInteraction } from "./handleInteraction";
import { useGameCommands } from "./useGameCommands";

export const useGameViewModel = (engine: GameEngine) => {
  const gameState = useGameStore(engine);
  const [ui, dispatch] = useReducer(uiReducer, undefined, createInitialUIState);

  const commands = useGameCommands({ engine, ui, dispatch });

  const makeInteraction = useCallback(
    (input: string) => handleInteraction(input, commands),
    [commands],
  );

  return { gameState, ui, commands, makeInteraction };
};
