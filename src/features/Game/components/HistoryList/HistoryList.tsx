import { Text } from "ink";

import { NavList } from "@/components/NavList";
import { useSettingsArrowNav } from "@/services/settings";

type Props = {
  movesCount: number;
};

export const HistoryList = ({ movesCount }: Props) => {
  const arrowNav = useSettingsArrowNav();
  const moves = getMoves(movesCount);

  return (
    <NavList
      data={moves}
      keyExtractor={(item) => item}
      arrowNav={arrowNav}
      selectedIndex={0}
      renderItem={(item) => <Text>{item}</Text>}
    />
  );
};

function getMoves(movesCount: number) {
  const moves = ["Go to game start"];

  for (let i = 1; i <= movesCount; i++) {
    moves.push(`Go to move ${i}`);
  }

  return moves;
}
