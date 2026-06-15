import readline from "readline";

// terminal communication interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const waitForInput = (query?: string): Promise<string> | null => {
  return new Promise((resolve) => rl.question(query ?? "", resolve));
};

export const closeInput = () => {
  rl.close();
};
