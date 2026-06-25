import type { GameEngine } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameInformations } from "@/features/game/components/GameInformations/GameInformations";

vi.mock("@/features/game/components/ui/PlayerPromptUI", () => ({
  PlayerPromptUI: vi.fn(),
}));
vi.mock("@/features/game/components/ui/GameHintUI", () => ({
  GameHintUI: vi.fn(),
}));
vi.mock("@/features/game/components/ui/InputErrorMessageUI", () => ({
  InputErrorMessageUI: vi.fn(),
}));

import { GameHintUI } from "@/features/game/components/ui/GameHintUI";
import { InputErrorMessageUI } from "@/features/game/components/ui/InputErrorMessageUI";
import { PlayerPromptUI } from "@/features/game/components/ui/PlayerPromptUI";

const createGame = (status: "running" | "draw" = "running"): GameEngine => ({
  getStatus: vi.fn().mockReturnValue({ status }),
  getCurrentPlayer: vi.fn().mockReturnValue("O"),
  getMovesCount: vi.fn().mockReturnValue(3),
  getBoard: vi.fn().mockReturnValue([]),
  makeMove: vi.fn(),
  reset: vi.fn(),
  backToMove: vi.fn(),
  isFieldOccupied: vi.fn().mockReturnValue(false),
  isGameOver: vi.fn().mockReturnValue(false),
});

const createGameState = (): GameStateManager =>
  ({
    inputError: null,
    historyMode: false,
    info: false,
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    setInputError: vi.fn(),
    reset: vi.fn(),
  }) as unknown as GameStateManager;

describe("GameInformations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders UI components when game is running", () => {
    const game = createGame("running");
    const gameState = createGameState();

    GameInformations({ game, isKeyHandlerRunning: false, gameState });

    expect(PlayerPromptUI).toHaveBeenCalled();
    expect(GameHintUI).toHaveBeenCalled();
    expect(InputErrorMessageUI).toHaveBeenCalled();
  });

  it("does not render when game is not running", () => {
    const game = createGame("draw");
    const gameState = createGameState();

    GameInformations({ game, isKeyHandlerRunning: false, gameState });

    expect(PlayerPromptUI).not.toHaveBeenCalled();
    expect(GameHintUI).not.toHaveBeenCalled();
  });

  it("passes correct props to GameHintUI", () => {
    const game = createGame("running");
    const gameState = createGameState();

    GameInformations({ game, isKeyHandlerRunning: true, gameState });

    expect(GameHintUI).toHaveBeenCalledWith(
      expect.objectContaining({ isKeyHandlerRunning: true, movesCount: 3 }),
    );
  });
});
