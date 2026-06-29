import { Box, Text } from "ink";
import { useRef } from "react";

import { Board } from "./components/Board";
import { GameHeader } from "./components/GameHeader";
import { GameHint } from "./components/GameHint";
import { GameInfo } from "./components/GameInfo";
import { GameStatus } from "./components/GameStatus";
import { InputError } from "./components/InputError";
import { PlayerPrompt } from "./components/PlayerPrompt";
import { createGameEngine } from "./engine/gameEngine";
import { useGameInput } from "./hooks/useGameInput";

export const Game = () => {
  const engineRef = useRef(createGameEngine());
  const { gameState, ui } = useGameInput(engineRef.current);

  const isRunning = engineRef.current.isRunning;

  return (
    <Box flexDirection="column">
      <GameHeader />
      <GameInfo showInfo={ui.showInfo} />
      <Box marginTop={1} justifyContent="center">
        <Board board={gameState.board} selectedCell={ui.selectedCell} />
      </Box>
      <GameStatus gameStatus={gameState.gameStatus} />
      {isRunning && (
        <>
          <PlayerPrompt currentPlayer={gameState.currentPlayer} />
          <GameHint
            movesCount={engineRef.current.movesCount}
            useArrowKeys={!ui.historyMode}
            isHistoryMode={ui.historyMode}
          />
          <InputError error={ui.inputError} />
        </>
      )}
      {!isRunning && (
        <Box marginTop={1}>
          <Text dimColor>Enter: play again · q: back to menu</Text>
        </Box>
      )}
    </Box>
  );
};
