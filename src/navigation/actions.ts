import type { Routes } from "./routes";

let _navigateTo: ((route: Routes) => void) | undefined;
let _goToMenu: (() => void) | undefined;

export const navigateTo = (route: Routes): void => {
  if (!_navigateTo) {
    throw new Error("Navigation not registered. Import '@/navigation' first.");
  }
  return _navigateTo(route);
};

export const goToMenu = (): void => {
  if (!_goToMenu) {
    throw new Error("Navigation not registered. Import '@/navigation' first.");
  }
  return _goToMenu();
};

export const registerNavigation = (nav: {
  navigateTo: (route: Routes) => void;
  goToMenu: () => void;
}) => {
  _navigateTo = nav.navigateTo;
  _goToMenu = nav.goToMenu;
};
