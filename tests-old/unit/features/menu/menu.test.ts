import { describe, expect, it, vi } from "vitest";

import { MenuView } from "@/features/menu";
import { ROUTES } from "@/navigation/routes";

vi.mock("@/features/menu/components/MenuHeader", () => ({
  MenuHeader: vi.fn(),
}));

vi.mock("@/features/menu/components/MenuOptions", () => ({
  MenuOptions: vi.fn(),
}));

vi.mock("@/features/menu/components/MenuEntry", () => ({
  MenuEntry: vi.fn().mockResolvedValue("game"),
}));

describe("MenuView", () => {
  it("renders menu and returns the chosen route", async () => {
    const route = await MenuView();

    expect(route).toBe(ROUTES.GAME);
  });
});
