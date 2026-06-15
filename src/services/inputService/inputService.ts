import readline from "readline";

// terminal communication interface
let rl = createInterface();

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export const waitForInput = (query?: string): Promise<string> | null => {
  return new Promise((resolve) => rl.question(query ?? "", resolve));
};

export const refreshInput = () => {
  rl.close();
  rl = createInterface();
};

export const closeInput = () => {
  rl.close();
};
