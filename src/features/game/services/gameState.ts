type GameState = {
  info: boolean;
  infoToggle: () => void;
};

export const gameState = new Proxy<GameState>(
  { info: false, infoToggle: () => {} },
  {
    get(target, prop: keyof GameState) {
      if (prop === "infoToggle") {
        return () => {
          target.info = !target.info;
        };
      }

      return target[prop];
    },
  },
);
