import type { CellViewModel } from "../boardAdapter";

import { Box, Text } from "ink";
import { Fragment, memo } from "react";

import { BoardItem } from "./BoardItem";

type BoardRowProps = {
  cells: CellViewModel[];
};

const Separator = () => <Text color="gray">│</Text>;

export const BoardRow = memo(({ cells }: BoardRowProps) => {
  return (
    <Box>
      <Separator />
      {cells.map((cell, i) => (
        <Fragment key={cell.index}>
          <BoardItem cell={cell} />
          {i < cells.length - 1 && <Separator />}
        </Fragment>
      ))}
      <Separator />
    </Box>
  );
});
