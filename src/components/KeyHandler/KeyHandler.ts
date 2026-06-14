import readline from "readline";

import { isTTYAvailable } from "@/global/tty.global";
import { enableRawMode, disableRawMode } from "@/utils/rawMode";

export type KeyHandlerCallback = (key: readline.Key) => void;

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
  private boundKeyListener: (_str: string, key: readline.Key) => void;

  constructor(options: KeyHandlerOptions) {
    this.onKeyPress = options.onKeyPress;
    this.handleCtrlC = options.handleCtrlC ?? true;
    this.onCtrlC = options.onCtrlC ?? (() => process.exit(0));
    this.boundKeyListener = this.keyListener.bind(this);
  }

  /**
   * Internal key event listener
   */
  private keyListener(_str: string, key: readline.Key): void {
    if (this.handleCtrlC && key.ctrl && key.name === "c") {
      this.stop();
      this.onCtrlC();
      return;
    }

    this.onKeyPress(key);
  }

  /**
   * Starts listening for key events.
   * Enables raw mode and registers listener.
   *
   * @returns true if started successfully, false if TTY unavailable
   */
  start(): boolean {
    if (this.isRunning) {
      return false;
    }

    if (!isTTYAvailable) {
      return false;
    }

    readline.emitKeypressEvents(process.stdin);

    const rawModeEnabled = enableRawMode();
    if (!rawModeEnabled) {
      return false;
    }

    process.stdin.on("keypress", this.boundKeyListener);
    this.isRunning = true;

    return true;
  }

  /**
   * Zatrzymuje nasłuchiwanie klawiszy.
   * Wyłącza raw mode i usuwa listener.
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    process.stdin.removeListener("keypress", this.boundKeyListener);

    disableRawMode();

    this.isRunning = false;
  }

  /**
   * Checks if the handler is active
   */
  get running(): boolean {
    return this.isRunning;
  }
}
