import { Footer } from "@/components/Footer";
import { BOARD_LENGTH } from "@/features/Game/constants/gameConstants";
import { useGameEngine } from "@/features/Game/hooks/useGameEngine";
import { gameInputSchema } from "@/features/Game/validation/gameInputSchema";
import { useGoBack } from "@/hooks/useGoBack";

import { Game as GameView } from "../features/Game";

export const Game = () => {
  useGoBack();
  const engine = useGameEngine();

  const handleOptionSelect = (value: string) => {
    if (isNaN(+value)) return;
  };

  return (
    <>
      <GameView engine={engine} />

      <Footer
        onSubmit={handleOptionSelect}
        hints={[
          `Select the number of the field (1-${BOARD_LENGTH})`,
          "esc Back to Menu",
        ]}
        arrowNavHints={[
          "↑↓ Use arrow keys to navigate",
          "Enter to confirm\n",
          "esc Back to Menu",
        ]}
        validationSchema={gameInputSchema}
      />
    </>
  );
};
