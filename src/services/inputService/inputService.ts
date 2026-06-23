import readline from "readline";

import { enableRawMode, disableRawMode } from "@/utils/rawMode";

// terminal communication interface
let rl: readline.Interface | null = createInterface();

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ensureInterface() {
  rl ??= createInterface();
  return rl;
}

function closeInterface() {
  if (!rl) return;

  rl.close();
  rl = null;
}

export const waitForInput = (query?: string): Promise<string> | null => {
  return new Promise((resolve) => ensureInterface().question(query ?? "", resolve));
};

const refreshInput = () => {
  closeInterface();
  rl = createInterface();
};

export const startKeyInput = () => {
  const input = ensureInterface();
  readline.emitKeypressEvents(process.stdin, input);

  const rawModeEnabled = enableRawMode();
  if (!rawModeEnabled) return false;

  process.stdin.resume();
  return true;
};

export const stopKeyInput = () => {
  disableRawMode();
  refreshInput();
};

export const closeInput = () => {
  closeInterface();
};
