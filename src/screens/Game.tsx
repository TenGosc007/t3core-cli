import { useCallback } from "react";

import { useArrowNavInput } from "@/features/Game/hooks/useArrowNavInput";
import { useGameEngine } from "@/features/Game/hooks/useGameEngine";
import { useGameViewModel } from "@/features/Game/hooks/useGameViewModel";
import { useGoBack } from "@/hooks/useGoBack";
import { useSettingsShowHistory } from "@/services/settings";

import { Game as GameView } from "../features/Game";
import { GameFooter } from "../features/Game/components/GameFooter";

export const Game = () => {
  useGoBack();
  const engine = useGameEngine();
  const showHistory = useSettingsShowHistory();
  const { gameState, ui, commands, makeInteraction } = useGameViewModel(engine);
  useArrowNavInput({ ui, commands });

  const handleOptionSelect = useCallback(
    (value: string) => {
      makeInteraction(value);
      if (isNaN(+value)) return;
      if (ui.historyMode) commands.backToMove(+value);
      else commands.makeMove(+value - 1);
    },
    [makeInteraction, ui.historyMode, commands],
  );

  return (
    <>
      <GameView engine={engine} gameState={gameState} ui={ui} />

      <GameFooter
        isGameRunning={engine.isRunning}
        isHistoryModeOn={ui.historyMode}
        historyMovesCount={engine.movesCount}
        showHistory={showHistory}
        onSubmit={handleOptionSelect}
      />
    </>
  );
};
