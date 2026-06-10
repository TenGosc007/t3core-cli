import { Board } from "./components/Board";
import { GameEntryMessage } from "./components/GameEntryMessage";
import { GameHeader } from "./components/GameHeader";
import { GameStatusMessage } from "./components/GameStatusMessage";
import { PlayerEntry } from "./components/PlayerEntry";

export const GameView = () => {
  GameHeader();
  GameEntryMessage();
  Board();
  GameStatusMessage();
  PlayerEntry();
};
