import type { Routes } from "./routes";

export let navigateTo: (route: Routes) => void;
export let goToMenu: () => void;

export const registerNavigation = (nav: {
  navigateTo: (route: Routes) => void;
  goToMenu: () => void;
}) => {
  navigateTo = nav.navigateTo;
  goToMenu = nav.goToMenu;
};
