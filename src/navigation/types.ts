export const ROUTES = {
  home: "/",
  settings: "/settings",
  gameMode: "/game-mode",
  game: "/game",
  about: "/about",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

// export type RouteName = keyof typeof ROUTES;
