import { useGameEngine } from "@/features/Game/hooks/useGameEngine";
import { useGameInput } from "@/features/Game/hooks/useGameInput";
import { useGoBack } from "@/hooks/useGoBack";

import { Game as GameView } from "../features/Game";
import { GameFooter } from "../features/Game/components/GameFooter";

export const Game = () => {
  useGoBack();
  const engine = useGameEngine();
  const { gameState, ui, commands } = useGameInput(engine);

  const handleOptionSelect = (value: string) => {
    if (isNaN(+value)) return;
    commands.makeMove(+value - 1);
  };

  return (
    <>
      <GameView engine={engine} gameState={gameState} ui={ui} />

      <GameFooter
        isGameRunning={engine.isRunning}
        isHistoryModeOn={ui.historyMode}
        historyMovesCount={engine.movesCount}
        onSubmit={handleOptionSelect}
      />
    </>
  );
};
