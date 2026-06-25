import { beforeEach, describe, expect, it, vi } from "vitest";

import { KeyHandler } from "@/services/keyHandlerService/keyHandler";

describe("KeyHandler", () => {
  const makeHandler = (overrides = {}) =>
    new KeyHandler({ onKeyPress: vi.fn().mockReturnValue(null), ...overrides });

  describe("constructor / getters", () => {
    it("initialises running as false", () => {
      expect(makeHandler().running).toBe(false);
    });

    it("initialises position as null by default", () => {
      expect(makeHandler().position).toBeNull();
    });

    it("respects initialPosition option", () => {
      const h = makeHandler({ initialPosition: 3 });
      expect(h.position).toBe(3);
      expect(h.initialPosition).toBe(3);
    });

    it("initialPosition defaults to null", () => {
      expect(makeHandler().initialPosition).toBeNull();
    });
  });

  describe("start()", () => {
    it("returns false when TTY is not available (test env)", () => {
      expect(makeHandler().start()).toBe(false);
    });

    it("returns false when already running", () => {
      const h = makeHandler();
      Object.defineProperty(h, "_isRunning", { value: true, writable: true });
      expect(h.start()).toBe(false);
    });
  });

  describe("stop()", () => {
    it("does nothing when not running", () => {
      expect(() => makeHandler().stop()).not.toThrow();
    });
  });

  describe("waitForKeyPress()", () => {
    it("resolves with null immediately when not running", async () => {
      const result = await makeHandler().waitForKeyPress();
      expect(result).toBeNull();
    });

    it("returns a Promise that resolves after next keypress when running", async () => {
      const onKeyPress = vi.fn().mockReturnValue(3);
      const h = makeHandler({ onKeyPress });

      const getBoundListener = (handler: KeyHandler) =>
        (
          handler as unknown as {
            _boundKeyListener: (...args: unknown[]) => void;
          }
        )._boundKeyListener;

      Object.defineProperty(h, "_isRunning", { value: true, writable: true });

      const promise = h.waitForKeyPress();

      const listener = getBoundListener(h);
      process.stdin.on("keypress", listener);
      process.stdin.emit("keypress", "", { name: "up" });
      process.stdin.removeListener("keypress", listener);

      const result = await promise;
      expect(result).toBe(3);
    });
  });

  describe("keyListener via stdin keypress event", () => {
    const getBoundListener = (h: KeyHandler) =>
      (h as unknown as { _boundKeyListener: (...args: unknown[]) => void })
        ._boundKeyListener;

    const emitKey = (h: KeyHandler, key: object) => {
      const listener = getBoundListener(h);
      process.stdin.on("keypress", listener);
      process.stdin.emit("keypress", "", key);
      process.stdin.removeListener("keypress", listener);
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("ignores keypress with unknown key name", () => {
      const onKeyPress = vi.fn();
      makeHandler({ onKeyPress });
      process.stdin.emit("keypress", "", { name: "z_unknown_xyz" });
      expect(onKeyPress).not.toHaveBeenCalled();
    });

    it("calls onKeyPress with recognized key when handler is active", () => {
      const onKeyPress = vi.fn().mockReturnValue(null);
      const h = makeHandler({ onKeyPress });
      emitKey(h, { name: "up" });
      expect(onKeyPress).toHaveBeenCalledWith(
        expect.objectContaining({
          key: expect.objectContaining({ name: "up" }),
        }),
      );
    });

    it("updates position when onKeyPress returns a number", () => {
      const onKeyPress = vi.fn().mockReturnValue(2);
      const h = makeHandler({ onKeyPress });
      emitKey(h, { name: "up" });
      expect(h.position).toBe(2);
    });

    it("calls onCtrlC and stop when Ctrl+C is pressed", () => {
      const onCtrlC = vi.fn();
      const h = makeHandler({ onCtrlC });
      emitKey(h, { name: "c", ctrl: true });
      expect(onCtrlC).toHaveBeenCalled();
    });

    it("calls process.exit(0) when no custom onCtrlC is provided", () => {
      const exitSpy = vi
        .spyOn(process, "exit")
        .mockImplementation(() => undefined as never);
      const h = new KeyHandler({ onKeyPress: vi.fn().mockReturnValue(null) });
      emitKey(h, { name: "c", ctrl: true });
      expect(exitSpy).toHaveBeenCalledWith(0);
      exitSpy.mockRestore();
    });

    it("does not call onCtrlC when handleCtrlC is false", () => {
      const onCtrlC = vi.fn();
      const onKeyPress = vi.fn().mockReturnValue(null);
      const h = makeHandler({ onCtrlC, onKeyPress, handleCtrlC: false });
      emitKey(h, { name: "c", ctrl: true });

      expect(onCtrlC).not.toHaveBeenCalled();
      expect(onKeyPress).toHaveBeenCalled();
    });
  });
});
