import { useNavigate } from "@/navigation";

import { GAME_MODE_OPTIONS } from "../constants/gameModeOptions";

export const useGameModeNavigation = () => {
  const navigate = useNavigate();

  const navigateToGameMode = (selectedIndex: number) => {
    const option = GAME_MODE_OPTIONS[selectedIndex];
    navigate(option.route);
  };

  return { navigateToGameMode };
};
