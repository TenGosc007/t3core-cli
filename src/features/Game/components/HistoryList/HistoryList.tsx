import { Text } from "ink";
import { useMemo } from "react";

import { NavList } from "@/components/NavList";
import { useSettingsArrowNav } from "@/services/settings";

type Props = {
  movesCount: number;
  selectedIndex?: number;
};

export const HistoryList = ({ movesCount, selectedIndex = 0 }: Props) => {
  const arrowNav = useSettingsArrowNav();
  const moves = useHistoryMoves(movesCount);

  return (
    <NavList
      style={{ marginLeft: -2 }}
      data={moves}
      keyExtractor={(item) => item}
      arrowNav={arrowNav}
      selectedIndex={selectedIndex}
      renderItem={(item) => <Text>{item}</Text>}
    />
  );
};

const useHistoryMoves = (movesCount: number) => {
  return useMemo(() => {
    const moves = ["Start"];

    for (let i = 1; i <= movesCount; i++) {
      moves.push(`Move ${i}`);
    }

    return moves;
  }, [movesCount]);
};
