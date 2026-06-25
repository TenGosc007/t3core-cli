import type { GameEngine, GameManager } from "@/features/game/engine";
import type { GameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { KeyHandler } from "@/services/keyHandlerService";

import { describe, expect, it, vi } from "vitest";

import { GameView } from "@/features/game";
import { ROUTES } from "@/navigation/routes";

vi.mock("@/features/game/components/GameInformations", () => ({
  GameInformations: vi.fn(),
}));

vi.mock("@/features/game/components/InputEntry", () => ({
  InputEntry: vi.fn().mockResolvedValue("q"),
}));

vi.mock("@/features/game/components/ui/GameHeaderUI", () => ({
  GameHeaderUI: vi.fn(),
}));

vi.mock("@/features/game/components/ui/BoardUI", () => ({
  BoardUI: vi.fn(),
}));

vi.mock("@/features/game/components/ui/GameEntryMessageUI", () => ({
  GameEntryMessageUI: vi.fn(),
}));

vi.mock("@/features/game/components/ui/GameStatusMessageUI", () => ({
  GameStatusMessageUI: vi.fn(),
}));

vi.mock("@/features/game/util/playAgain", () => ({
  playAgain: vi.fn().mockResolvedValue(false),
}));

vi.mock("@/utils/viewUtils", () => ({
  restoreAndClearDown: vi.fn(),
  saveCursor: vi.fn(),
}));

const createGame = (): GameEngine => {
  return {
    getBoard: vi.fn().mockReturnValue([]),
    getStatus: vi.fn().mockReturnValue("ongoing"),
    isGameOver: vi.fn().mockReturnValue(false),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    getMovesCount: vi.fn().mockReturnValue(0),
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    reset: vi.fn(),
  } as unknown as GameEngine;
};

const createGameManager = (game: GameEngine): GameManager => {
  return {
    getGame: vi.fn().mockReturnValue(game),
    reset: vi.fn(),
  } as unknown as GameManager;
};

const createGameState = (): GameStateManager => {
  return {
    historyMode: false,
    info: false,
    setInputError: vi.fn(),
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    reset: vi.fn(),
  } as unknown as GameStateManager;
};

const createKeyHandlerService = (): GameKeyHandlerService => {
  const handler = {
    running: false,
    position: 0,
    start: vi.fn(),
    stop: vi.fn(),
    waitForKeyPress: vi.fn().mockResolvedValue(null),
  } as unknown as KeyHandler;

  return {
    get: vi.fn().mockReturnValue(handler),
    stop: vi.fn(),
  } as unknown as GameKeyHandlerService;
};

describe("GameView", () => {
  it("returns to menu when user exits", async () => {
    const game = createGame();
    const manager = createGameManager(game);
    const gameState = createGameState();
    const keyHandlerService = createKeyHandlerService();

    const result = await GameView({
      gameState,
      manager,
      gameKeyHandlerService: keyHandlerService,
    });

    expect(result).toBe(ROUTES.MENU);
    expect(keyHandlerService.stop).toHaveBeenCalled();
  });
});
