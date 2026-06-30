import { describe, expect, it, vi } from "vitest";

import { app } from "@/app";
import { renderRoute } from "@/navigation/renderRoute";

vi.mock("@/navigation/renderRoute", () => ({
  renderRoute: vi.fn(),
}));

vi.mock("@/utils/beepAndClear", () => ({
  beepAndDeepClear: vi.fn(),
}));

vi.mock("@/components/Header", () => ({
  Header: vi.fn(),
}));

vi.mock("@/services/inputService", () => ({
  closeInput: vi.fn(),
}));

vi.mock("@/utils/beepSound", () => ({
  beepSound: vi.fn(),
}));

describe("app", () => {
  it("exits the app when renderRoute returns exit", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    vi.mocked(renderRoute).mockResolvedValue("exit");

    await app();

    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });
});
