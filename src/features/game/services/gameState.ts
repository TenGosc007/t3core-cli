type ToggleableKeys = "info" | "historyMode";

type GameState = {
  info: boolean;
  historyMode: boolean;
  inputError?: string | null;
  toggleState: (key: ToggleableKeys) => void;
};

const gameStateDefault = {
  info: false,
  historyMode: false,
  inputError: undefined,
  toggleState: () => {},
} satisfies GameState;

export const gameState = new Proxy<GameState>(gameStateDefault, {
  get(target, prop: keyof GameState) {
    if (prop === "toggleState") {
      return (key: ToggleableKeys) => {
        target[key] = !target[key];
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
