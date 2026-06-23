export const clearConsole = () => {
  process.stdout.write("\x1b[2J\x1b[H");
};

export const saveCursor = () => {
  process.stdout.write("\x1b[s");
};

export const restoreCursor = () => {
  process.stdout.write("\x1b[u");
};

export const clearDown = () => {
  process.stdout.write("\x1b[J");
};

export const hideCursor = () => {
  process.stdout.write("\x1b[?25l");
};

export const showCursor = () => {
  process.stdout.write("\x1b[?25h");
};

export const restoreAndClearDown = () => {
  restoreCursor();
  clearDown();
};
