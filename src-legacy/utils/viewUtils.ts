export const saveCursor = () => {
  process.stdout.write("\x1b[s");
};

const restoreCursor = () => {
  process.stdout.write("\x1b[u");
};

const clearDown = () => {
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
