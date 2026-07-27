import { Footer } from "@/components/Footer";

import { gameInputSchema } from "../../validation/gameInputSchema";
import { historyInputSchema } from "../../validation/historyInputSchema";
import { GameEndFooter } from "./GameEndFooter";
import { getGameFooterHints } from "./getGameFooterHints";

type GameFooterProps = {
  onSubmit: (value: string) => void;
  historyMovesCount: number;
  isGameRunning?: boolean;
  isHistoryModeOn?: boolean;
};

export const GameFooter = ({
  isGameRunning,
  isHistoryModeOn,
  historyMovesCount,
  onSubmit,
}: GameFooterProps) => {
  if (!isGameRunning) {
    return <GameEndFooter onSubmit={onSubmit} />;
  }

  const { hints, arrowNavHints } = getGameFooterHints(
    historyMovesCount,
    isHistoryModeOn,
  );

  return (
    <Footer
      onSubmit={onSubmit}
      hints={hints}
      arrowNavHints={arrowNavHints}
      validationSchema={
        isHistoryModeOn
          ? historyInputSchema(historyMovesCount)
          : gameInputSchema
      }
    />
  );
};
