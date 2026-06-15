type ToggleableKeys = "info" | "historyMode";

type GameState = {
  info: boolean;
  historyMode: boolean;
  inputError?: string | null;
  toggleState: (key: ToggleableKeys) => void;
  reset: () => void;
};

const gameStateDefault = {
  info: false,
  historyMode: false,
  inputError: null,
  toggleState: () => {},
  reset: () => {},
} satisfies GameState;

export const gameState = new Proxy<GameState>(gameStateDefault, {
  get(target, prop: keyof GameState) {
    if (prop === "toggleState") {
      return (key: ToggleableKeys) => {
        target[key] = !target[key];
      };
    }

    if (prop === "reset") {
      return () => {
        target.historyMode = false;
        target.info = false;
        target.inputError = null;
      };
    }
    return target[prop];
  },
  set(target, prop: keyof GameState, value: string | undefined) {
    if (prop === "inputError") {
      target.inputError = value;
      return true;
    }
    return false;
  },
});
