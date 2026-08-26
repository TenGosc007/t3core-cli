import { ROUTES } from "@/navigation";

export const GAME_MODE_OPTIONS = [
  { label: "Player vs Player", route: ROUTES.game },
  { label: "Player vs AI", route: ROUTES.game },
] as const;

export type GameModeOption = (typeof GAME_MODE_OPTIONS)[number];
