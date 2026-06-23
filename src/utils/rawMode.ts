/**
 * Tools for managing terminal "raw" mode.
 * In raw mode, keystrokes are sent to the program immediately without buffering.
 */

import { isTTYAvailable } from "@/global/tty.global";

/**
 * Enables raw mode for process.stdin.
 * In raw mode, the terminal does not buffer lines - each keystroke is available immediately.
 * NOTE: Requires manual handling of Ctrl+C (process.exit).
 *
 * @returns true if raw mode was enabled, false if TTY is unavailable
 */
export const enableRawMode = (): boolean => {
  if (!isTTYAvailable || !process.stdin.isTTY) {
    return false;
  }

  process.stdin.setRawMode(true);
  return true;
};

/**
 * Disables raw mode and restores normal terminal behavior.
 *
 * @returns true if raw mode was disabled, false if TTY is unavailable
 */
export const disableRawMode = (): boolean => {
  if (!isTTYAvailable || !process.stdin.isTTY) {
    return false;
  }

  process.stdin.setRawMode(false);
  return true;
};

/**
 * Executes a function in raw mode context, automatically restoring
 * normal mode after completion (even on errors).
 *
 * @param fn Function to execute in raw mode
 * @returns Result of fn
 * @throws Errors from fn
 */
export const withRawMode = <T>(fn: () => T): T => {
  const wasEnabled = enableRawMode();

  try {
    return fn();
  } finally {
    if (wasEnabled) {
      disableRawMode();
    }
  }
};
