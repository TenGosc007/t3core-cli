import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { GameMode as GameModeView } from "@/features/GameMode";
import { GAME_MODE_OPTIONS } from "@/features/GameMode/constants/gameModeOptions";
import { useGameModeNavigation } from "@/features/GameMode/hooks/useGameModeNavigation";
import { gameModeInputSchema } from "@/features/GameMode/validation";
import { useGoBack } from "@/hooks/useGoBack";

export const GameMode = () => {
  const { navigateToGameMode } = useGameModeNavigation();
  useGoBack();

  const handleOptionSelect = (value: string) => {
    if (isNaN(+value)) return;
    navigateToGameMode(+value - 1);
  };

  return (
    <>
      <Container>
        <GameModeView />
      </Container>

      <Footer
        onSubmit={handleOptionSelect}
        hints={[`Type 1-${GAME_MODE_OPTIONS.length} to select`, `q Back`]}
        arrowNavHints={["↑↓ Navigate", "Enter Select"]}
        validationSchema={gameModeInputSchema}
      />
    </>
  );
};
