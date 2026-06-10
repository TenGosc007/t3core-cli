import { beepAndClear } from "@/utils/beepAndClear";

import { Header } from "../components/Header";
import { GameView } from "../features/game/game";

export const GameScreen = () => {
  beepAndClear();
  Header();
  GameView();
};
