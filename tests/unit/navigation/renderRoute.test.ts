import { describe, expect, it, vi } from "vitest";

import { renderRoute } from "@/navigation/renderRoute";
import { ROUTES } from "@/navigation/routes";

vi.mock("@/features/game", () => ({
  GameView: vi.fn().mockResolvedValue("menu"),
}));

vi.mock("@/features/menu", () => ({
  MenuView: vi.fn().mockResolvedValue("game"),
}));

vi.mock("@/features/settings", () => ({
  SettingsView: vi.fn().mockResolvedValue("menu"),
}));

describe("renderRoute", () => {
  it("renders menu route", async () => {
    const result = await renderRoute(ROUTES.MENU);

    expect(result).toBe(ROUTES.GAME);
  });

  it("renders game route", async () => {
    const result = await renderRoute(ROUTES.GAME);

    expect(result).toBe(ROUTES.MENU);
  });

  it("renders settings route", async () => {
    const result = await renderRoute(ROUTES.SETTINGS);

    expect(result).toBe(ROUTES.MENU);
  });
});
