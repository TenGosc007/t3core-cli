import { Box } from "ink";

import { Game as GameView } from "../features/Game";

export const Game = () => {
  return (
    <Box flexDirection="column">
      <GameView />
    </Box>
  );
};
