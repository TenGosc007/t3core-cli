import type { GameModeOption } from "./constants/gameModeOptions";

import { useCallback } from "react";

import { NavList } from "@/components/NavList";

import { GameModeItem } from "./components/GameModeItem";
import { GAME_MODE_OPTIONS } from "./constants/gameModeOptions";
import { useGameModeInput } from "./hooks/useGameModeInput";

export const GameMode = () => {
  const { selectedIndex, arrowNav } = useGameModeInput();

  const renderItem = useCallback(
    (option: GameModeOption, index: number) => (
      <GameModeItem
        label={option.label}
        selected={arrowNav && index === selectedIndex}
      />
    ),
    [arrowNav, selectedIndex],
  );

  return (
    <NavList
      style={{ marginTop: 1 }}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      data={GAME_MODE_OPTIONS}
      keyExtractor={(option) => option.label}
      renderItem={renderItem}
    />
  );
};
