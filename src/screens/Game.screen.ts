import { Board } from "@/features/game/components/Board";
import { GameEntryMessage } from "@/features/game/components/GameEntryMessage";
import { GameStatusMessage } from "@/features/game/components/GameStatusMessage";
import { PlayerEntry } from "@/features/game/components/PlayerEntry";

import { Header } from "../components/Header";
import { GameHeader } from "../features/game/components/GameHeader";
import { beepAndClear } from "../utils/beepAndClear";

export const GameScreen = () => {
  beepAndClear();
  Header();
  GameHeader();
  GameEntryMessage();
  Board();
  GameStatusMessage();
  PlayerEntry(GameScreen);
};
