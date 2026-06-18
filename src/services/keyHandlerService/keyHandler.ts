import readline from "readline";

import { NAV_KEYS, type NavKey } from "@/global/navigationKeys";
import { isTTYAvailable } from "@/global/tty.global";
import { enableRawMode, disableRawMode } from "@/utils/rawMode";
import { hideCursor, showCursor } from "@/utils/viewUtils";

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
  /** Whether to hide the terminal cursor while the handler is running (default: true) */
  hideCursor?: boolean;
  initialPosition?: number | string | null;
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
  private _onKeyPress: KeyHandlerCallback;
  private _handleCtrlC: boolean;
  private _onCtrlC: () => void;
  private _shouldHideCursor: boolean;
  private _isRunning = false;
  private _boundKeyListener: (_str: string, key: ReadlineKey) => void;
  private _position: number | string | null = null;
  private _initialPosition: number | string | null = null;
  private _resolveKeyPress:
    | ((position: number | string | null) => void)
    | null = null;

  constructor(options: KeyHandlerOptions) {
    this._onKeyPress = options.onKeyPress;
    this._position = this._initialPosition = options.initialPosition ?? null;
    this._handleCtrlC = options.handleCtrlC ?? true;
    this._onCtrlC = options.onCtrlC ?? (() => process.exit(0));
    this._shouldHideCursor = options.hideCursor ?? true;
    this._boundKeyListener = this.keyListener.bind(this);
  }

  /**
   * Checks if the handler is active
   */
  get running(): boolean {
    return this._isRunning;
  }

  /**
   * Gets the current position
   */
  get position() {
    return this._position;
  }

  /**
   * Gets the initial position
   */
  get initialPosition() {
    return this._initialPosition;
  }

  /**
   * Internal key event listener
   */
  private keyListener(_str: string, key: ReadlineKey): void {
    if (this._handleCtrlC && key.ctrl && key.name === NAV_KEYS.C) {
      this.stop();
      this._onCtrlC();
      return;
    }

    this._position = this._onKeyPress({
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
    if (this._isRunning) return false;
    if (!isTTYAvailable) return false;

    readline.emitKeypressEvents(process.stdin);

    const rawModeEnabled = enableRawMode();
    if (!rawModeEnabled) return false;

    process.stdin.on("keypress", this._boundKeyListener);
    this._position = this._initialPosition;
    this._isRunning = true;
    if (this._shouldHideCursor) hideCursor();

    return true;
  }

  /**
   * Stops listening for keypresses.
   * Disables raw mode and removes the listener.
   */
  stop(): void {
    if (!this._isRunning) return;

    process.stdin.removeListener("keypress", this._boundKeyListener);
    disableRawMode();

    this._position = null;
    this._isRunning = false;
    if (this._shouldHideCursor) showCursor();
  }

  /**
   * Resets the position to the initial position
   */
  resetPosition(): void {
    this._position = this._initialPosition;
  }
}
