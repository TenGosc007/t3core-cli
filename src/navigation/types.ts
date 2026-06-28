export const ROUTES = {
  home: "/",
  settings: "/settings",
  game: "/game",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export type RouteName = keyof typeof ROUTES;
