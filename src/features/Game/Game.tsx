import { Box, Newline, Text } from "ink";
import { useRef } from "react";

import { Container } from "@/components/Container";

import { Board } from "./components/Board";
import { GameHint } from "./components/GameHint";
import { GameInfo } from "./components/GameInfo";
import { GameStatus } from "./components/GameStatus";
import { InputError } from "./components/InputError";
import { PlayerPrompt } from "./components/PlayerPrompt";
import { createGameEngine } from "./engine/gameEngine";
import { useGameInput } from "./hooks/useGameInput";

export const Game = () => {
  const engineRef = useRef(createGameEngine());
  const { gameState, ui, arrowNav } = useGameInput(engineRef.current);

  const isRunning = engineRef.current.isRunning;

  return (
    <Box flexDirection="column" width="100%">
      <GameInfo showInfo={ui.showInfo} />

      <Container justifyContent="center">
        <PlayerPrompt currentPlayer={gameState.currentPlayer} />
        <Board board={gameState.board} selectedCell={ui.selectedCell} />
        <GameStatus gameStatus={gameState.gameStatus} />

        {isRunning && (
          <>
            {ui.inputError ? <InputError error={ui.inputError} /> : <Newline />}
            <GameHint
              movesCount={engineRef.current.movesCount}
              useArrowNavs={arrowNav && !ui.historyMode}
              isHistoryMode={ui.historyMode}
            />
          </>
        )}

        {!isRunning && (
          <Box marginTop={1}>
            <Text dimColor>Enter: play again · q: back to menu</Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};
