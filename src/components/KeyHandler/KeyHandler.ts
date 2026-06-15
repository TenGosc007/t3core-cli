import readline from "readline";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";
import { isTTYAvailable } from "@/global/tty.global";
import { enableRawMode, disableRawMode } from "@/utils/rawMode";

export type ReadlineKey = Omit<readline.Key, "name"> & { name: NavKey };
export type KeyHandlerProps = {
  key: ReadlineKey;
  position: number | string | null;
  handler: KeyHandler;
};
export type KeyHandlerCallback = (
  props: KeyHandlerProps,
) => number | string | null;

export interface KeyHandlerOptions {
  /** Callback invoked for each key press */
  onKeyPress: KeyHandlerCallback;
  /** Whether to automatically handle Ctrl+C (default: true) */
  handleCtrlC?: boolean;
  /** Custom action for Ctrl+C (default: process.exit(0)) */
  onCtrlC?: () => void;
}

/**
 * Reusable keyboard handler for CLI.
 * Manages raw mode, event listening, and cleanup.
 *
 * @example
 * ```typescript
 * const handler = new KeyHandler({
 *   onKeyPress: (key) => {
 *     if (key.name === "up") console.log("Up arrow!");
 *   }
 * });
 * handler.start();
 * // ... usage
 * handler.stop();
 * ```
 */
export class KeyHandler {
  private onKeyPress: KeyHandlerCallback;
  private handleCtrlC: boolean;
  private onCtrlC: () => void;
  private isRunning = false;
  private boundKeyListener: (_str: string, key: ReadlineKey) => void;
  private _position: number | string | null = null;
  private _prevPosition: number | string | null = null;
  private _resolveKeyPress:
    | ((position: number | string | null) => void)
    | null = null;

  constructor(options: KeyHandlerOptions) {
    this.onKeyPress = options.onKeyPress;
    this.handleCtrlC = options.handleCtrlC ?? true;
    this.onCtrlC = options.onCtrlC ?? (() => process.exit(0));
    this.boundKeyListener = this.keyListener.bind(this);
  }

  /**
   * Checks if the handler is active
   */
  get running(): boolean {
    return this.isRunning;
  }

  /**
   * Gets the current position
   */
  get position() {
    return this._position;
  }

  /**
   * Gets the previous position
   */
  get prevPosition() {
    return this._prevPosition;
  }

  /**
   * Internal key event listener
   */
  private keyListener(_str: string, key: ReadlineKey): void {
    if (this.handleCtrlC && key.ctrl && key.name === NAV_KEYS.C) {
      this.stop();
      this.onCtrlC();
      return;
    }

    this._prevPosition = this._position;
    this._position = this.onKeyPress({
      key,
      position: this._position,
      handler: this,
    });

    if (this._resolveKeyPress) {
      const resolve = this._resolveKeyPress;
      this._resolveKeyPress = null;
      resolve(this._position);
    }
  }

  /**
   * Returns a Promise that resolves with the new position after the next key press.
   */
  waitForKeyPress(): Promise<number | string | null> {
    return new Promise((resolve) => {
      this._resolveKeyPress = resolve;
    });
  }

  /**
   * Starts listening for key events.
   * Enables raw mode and registers listener.
   *
   * @returns true if started successfully, false if TTY unavailable
   */
  start(): boolean {
    if (this.isRunning) return false;
    if (!isTTYAvailable) return false;

    readline.emitKeypressEvents(process.stdin);

    const rawModeEnabled = enableRawMode();
    if (!rawModeEnabled) return false;

    process.stdin.on("keypress", this.boundKeyListener);
    this.isRunning = true;

    return true;
  }

  /**
   * Zatrzymuje nasłuchiwanie klawiszy.
   * Wyłącza raw mode i usuwa listener.
   */
  stop(): void {
    if (!this.isRunning) return;

    process.stdin.removeListener("keypress", this.boundKeyListener);
    disableRawMode();
    this.isRunning = false;
  }
}
