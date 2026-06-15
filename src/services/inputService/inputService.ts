import readline from "readline";

// terminal communication interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const waitForInput = (query?: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query ?? "", resolve));
};

const closeInput = () => {
  rl.close();
};

const pauseInput = () => {
  rl.pause();
};

const resumeInput = () => {
  rl.resume();
};

export { waitForInput, closeInput, pauseInput, resumeInput };
