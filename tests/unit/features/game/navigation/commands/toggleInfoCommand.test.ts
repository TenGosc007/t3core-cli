import type { GameStateManager } from "@/features/game/services/gameState";

import { describe, expect, it, vi } from "vitest";

import { ToggleInfoCommand } from "@/features/game/navigation/commands/toggleInfoCommand";
import { NAV_KEYS } from "@/global/navigationKeys";

const createGameState = () => {
  return {
    toggleInfo: vi.fn(),
    info: false,
  } as unknown as GameStateManager;
};

describe("ToggleInfoCommand", () => {
  it("handles only i key", () => {
    const command = new ToggleInfoCommand(createGameState());

    expect(command.canHandle(NAV_KEYS.I)).toBe(true);
    expect(command.canHandle(NAV_KEYS.H)).toBe(false);
  });

  it("toggles info and returns i key", () => {
    const gameState = createGameState();
    const command = new ToggleInfoCommand(gameState);

    expect(command.execute()).toBe(NAV_KEYS.I);
    expect(gameState.toggleInfo).toHaveBeenCalled();
  });
});
