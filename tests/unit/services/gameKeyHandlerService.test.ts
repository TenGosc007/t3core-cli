import type { GameManager } from "@/features/game/engine";
import type { GameStateManager } from "@/features/game/services/gameState";
import type { SettingsManager } from "@/services/settings";

import { describe, expect, it, vi } from "vitest";

import { createGameKeyHandlerService } from "@/features/game/services/gameKeyHandlerService";

vi.mock("@/global/tty.global", () => ({
  isTTYAvailable: false,
}));

const createSettingsManager = (arrowKeyNavigation: boolean) => {
  return {
    getRuntimeSettings: vi.fn().mockReturnValue({
      beep: true,
      style: true,
      arrowKeyNavigation,
    }),
  } as unknown as SettingsManager;
};

const createGameState = (historyMode: boolean) => {
  return {
    historyMode,
    setInputError: vi.fn(),
    toggleHistoryMode: vi.fn(),
    toggleInfo: vi.fn(),
    reset: vi.fn(),
  } as unknown as GameStateManager;
};

const createGameManager = () => {
  const game = {
    getBoard: vi.fn().mockReturnValue([]),
    getStatus: vi.fn().mockReturnValue("ongoing"),
    isFieldOccupied: vi.fn().mockReturnValue(false),
    isGameOver: vi.fn().mockReturnValue(false),
    getMovesCount: vi.fn().mockReturnValue(0),
    makeMove: vi.fn(),
    backToMove: vi.fn(),
    reset: vi.fn(),
  };
  return {
    getGame: vi.fn().mockReturnValue(game),
    reset: vi.fn(),
  } as unknown as GameManager;
};

describe("createGameKeyHandlerService", () => {
  it("returns handler when arrow key navigation is enabled and history mode is off", () => {
    const service = createGameKeyHandlerService({
      settingsManager: createSettingsManager(true),
      gameStateManager: createGameState(false),
      manager: createGameManager(),
    });

    const handler = service.get();
    expect(handler).toBeDefined();
    expect(handler.initialPosition).toBe(4);
  });

  it("does not start handler when TTY is unavailable", () => {
    const service = createGameKeyHandlerService({
      settingsManager: createSettingsManager(true),
      gameStateManager: createGameState(false),
      manager: createGameManager(),
    });

    const handler = service.get();
    expect(handler.running).toBe(false);
  });

  it("stops handler when arrow key navigation is disabled", () => {
    const service = createGameKeyHandlerService({
      settingsManager: createSettingsManager(false),
      gameStateManager: createGameState(false),
      manager: createGameManager(),
    });

    const handler = service.get();
    expect(handler.running).toBe(false);
  });

  it("stops handler when history mode is on", () => {
    const service = createGameKeyHandlerService({
      settingsManager: createSettingsManager(true),
      gameStateManager: createGameState(true),
      manager: createGameManager(),
    });

    const handler = service.get();
    expect(handler.running).toBe(false);
  });

  it("stops the handler", () => {
    const service = createGameKeyHandlerService({
      settingsManager: createSettingsManager(true),
      gameStateManager: createGameState(false),
      manager: createGameManager(),
    });

    const handler = service.get();
    service.stop();
    expect(handler.running).toBe(false);
  });
});
