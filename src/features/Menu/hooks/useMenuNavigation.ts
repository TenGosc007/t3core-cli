import { useNavigate } from "@/navigation";
import { useExitAppStore } from "@/services/app";

import { MENU_OPTIONS } from "../constants/menuOptions";

export const useMenuNavigation = () => {
  const navigate = useNavigate();
  const exit = useExitAppStore((state) => state.exit);

  const navigateToMenuOption = (selectedIndex: number) => {
    const option = MENU_OPTIONS[selectedIndex];
    if (option.route === null) {
      exit();
    } else {
      navigate(option.route);
    }
  };

  return { navigateToMenuOption };
};
