import type { AppRoute } from "@/navigation/routes";

import { Header } from "@/components/Header";
import { beepAndClear } from "@/utils/beepAndClear";

import { MenuEntry } from "./components/MenuEntry";
import { MenuHeader } from "./components/MenuHeader";
import { MenuOptions } from "./components/MenuOptions";

export const MenuView = async (): Promise<AppRoute> => {
  beepAndClear();
  Header();
  MenuHeader();
  MenuOptions();
  return MenuEntry();
};
