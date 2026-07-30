import type { GameEngine } from "./engine/gameEngine";
import type { GameSnapshot } from "./engine/gameEngine";
import type { UIState } from "./reducers/gameReducer";

import { Box } from "ink";

import { Container } from "@/components/Container";

import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";
import { GameMessages } from "./components/GameMessages";
import { PlayerPrompt } from "./components/PlayerPrompt";

type GameProps = {
  engine: GameEngine;
  gameState: GameSnapshot;
  ui: UIState;
};

export const Game = ({ engine, gameState, ui }: GameProps) => {
  const isRunning = engine.isRunning;

  return (
    <Box flexDirection="column" width="100%">
      <GameInfo showInfo={ui.showInfo} />

      <Container justifyContent="center" marginTop={1} paddingBottom={0}>
        <PlayerPrompt currentPlayer={gameState.currentPlayer} />
        <Board board={gameState.board} selectedCell={ui.selectedCell} />
        <GameMessages
          gameStatus={gameState.gameStatus}
          inputError={isRunning ? ui.inputError : null}
          movesCount={engine.movesCount}
          isInHistoryMode={ui.historyMode}
        />
      </Container>
    </Box>
  );
};
