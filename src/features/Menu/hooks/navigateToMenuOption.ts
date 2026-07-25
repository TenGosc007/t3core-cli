import { useApp } from "ink";

import { useNavigate } from "@/navigation";

import { MENU_OPTIONS } from "../constants/menuOptions";

export const useMenuNavigation = () => {
  const navigate = useNavigate();
  const { exit } = useApp();

  const navigateToMenuOption = (selectedIndex: number) => {
    const option = MENU_OPTIONS[selectedIndex];
    console.log(option);
    if (option.route === null) {
      exit();
    } else {
      navigate(option.route);
    }
  };

  return navigateToMenuOption;
};
