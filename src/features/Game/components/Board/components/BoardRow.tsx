import type { CellViewModel } from "../boardAdapter";

import { Box, Text } from "ink";
import { Fragment, memo } from "react";

import { BoardItem } from "./BoardItem";

type BoardRowProps = {
  cells: CellViewModel[];
  dimColor?: boolean;
};

const Separator = () => <Text color="gray">│</Text>;

export const BoardRow = memo(({ cells, dimColor }: BoardRowProps) => {
  return (
    <Box>
      <Separator />
      {cells.map((cell, i) => (
        <Fragment key={cell.index}>
          <BoardItem cell={cell} dimColor={dimColor} />
          {i < cells.length - 1 && <Separator />}
        </Fragment>
      ))}
      <Separator />
    </Box>
  );
});
