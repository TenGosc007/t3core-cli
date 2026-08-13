import { describe, expect, it, vi } from "vitest";

import { handleInteraction } from "@/features/Game/hooks/useGameViewModel/handleInteraction";

const makeCommands = () => ({
  toggleInfo: vi.fn(),
  toggleHistory: vi.fn(),
});

describe("handleInteraction", () => {
  it("toggles info on 'i'", () => {
    const commands = makeCommands();
    handleInteraction("i", commands);
    expect(commands.toggleInfo).toHaveBeenCalledTimes(1);
    expect(commands.toggleHistory).not.toHaveBeenCalled();
  });

  it("toggles history on 'h'", () => {
    const commands = makeCommands();
    handleInteraction("h", commands);
    expect(commands.toggleHistory).toHaveBeenCalledTimes(1);
    expect(commands.toggleInfo).not.toHaveBeenCalled();
  });

  it("does nothing on other input", () => {
    const commands = makeCommands();
    handleInteraction("x", commands);
    expect(commands.toggleInfo).not.toHaveBeenCalled();
    expect(commands.toggleHistory).not.toHaveBeenCalled();
  });

  it("does nothing on empty input", () => {
    const commands = makeCommands();
    handleInteraction("", commands);
    expect(commands.toggleInfo).not.toHaveBeenCalled();
    expect(commands.toggleHistory).not.toHaveBeenCalled();
  });
});
