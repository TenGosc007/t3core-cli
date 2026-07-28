import type { GameEngine } from "./engine/gameEngine";
import type { GameSnapshot } from "./engine/gameEngine";
import type { UIState } from "./reducers/gameReducer";

import { Box } from "ink";

import { Container } from "@/components/Container";

import { Board } from "./components/Board";
import { GameInfo } from "./components/GameInfo";
import { GameStatus } from "./components/GameStatus";
import { HistoryList } from "./components/HistoryList";
import { InputError } from "./components/InputError";
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

      <Container justifyContent="center" marginTop={1}>
        <PlayerPrompt currentPlayer={gameState.currentPlayer} />
        <Board board={gameState.board} selectedCell={ui.selectedCell} />
        <GameStatus gameStatus={gameState.gameStatus} />
        <InputError error={isRunning ? ui.inputError : null} />
        <HistoryList />
      </Container>
    </Box>
  );
};
