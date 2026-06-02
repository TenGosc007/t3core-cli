import { Header } from "../components/Header";
import { MenuView } from "../features/menu/menu";
import { beepAndClear } from "../utils/beepAndClear";

export const MenuScreen = async () => {
  beepAndClear();
  Header();
  MenuView();
};
