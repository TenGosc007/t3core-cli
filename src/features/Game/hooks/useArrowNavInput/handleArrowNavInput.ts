import type { UIState } from "../../reducers/gameReducer";
import type { GameCommands } from "../useGameViewModel/types";
import type { Key } from "ink";

import { INTERACTION_KEYS } from "../../constants/gameConstants";

type Commands = Pick<
  GameCommands,
  | "toggleInfo"
  | "toggleHistory"
  | "navigateHistory"
  | "backToMove"
  | "navigate"
  | "makeMove"
>;

const isConfirm = (input: string, key: Key) => key.return || input === " ";

export const handleInteractionKeys = (input: string, commands: Commands) => {
  if (input === INTERACTION_KEYS.INFO) commands.toggleInfo();
  if (input === INTERACTION_KEYS.HISTORY) commands.toggleHistory();
};

export const handleHistoryNav = (
  input: string,
  key: Key,
  ui: UIState,
  commands: Commands,
) => {
  if (key.upArrow) return commands.navigateHistory("up");
  if (key.downArrow) return commands.navigateHistory("down");
  if (isConfirm(input, key))
    return commands.backToMove(ui.historySelectedIndex);
};

export const handleBoardNav = (
  input: string,
  key: Key,
  ui: UIState,
  commands: Commands,
) => {
  if (key.upArrow) return commands.navigate("up");
  if (key.downArrow) return commands.navigate("down");
  if (key.leftArrow) return commands.navigate("left");
  if (key.rightArrow) return commands.navigate("right");
  if (isConfirm(input, key)) commands.makeMove(ui.selectedCell);
};

export const handleArrowNavInput = (
  input: string,
  key: Key,
  ui: UIState,
  commands: Commands,
) => {
  handleInteractionKeys(input, commands);
  if (ui.historyMode) return handleHistoryNav(input, key, ui, commands);

  handleBoardNav(input, key, ui, commands);
};
