import type { ComponentProps, ReactNode } from "react";

import { Box } from "ink";

export type ListProps<T> = {
  data: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  style?: ComponentProps<typeof Box>;
};

export const List = <T,>({ data, renderItem, style }: ListProps<T>) => {
  return (
    <Box flexDirection="column" {...style}>
      {data.map(renderItem)}
    </Box>
  );
};
