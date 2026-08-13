export type ExitConfirmResult =
  | { type: "noop" }
  | { type: "startConfirm" }
  | { type: "exit" }
  | { type: "cancel" };

export const handleExitInput = (
  input: string,
  isHome: boolean,
  confirming: boolean,
): ExitConfirmResult => {
  if (input === "q" && isHome) return { type: "startConfirm" };
  if (!confirming) return { type: "noop" };
  if (input === "y") return { type: "exit" };
  if (input === "n") return { type: "cancel" };
  return { type: "noop" };
};
