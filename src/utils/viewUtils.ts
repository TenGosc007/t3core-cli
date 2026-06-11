export const clearConsole = () => {
  process.stdout.write("\x1b[2J\x1b[H");
};
