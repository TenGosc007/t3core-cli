import type { ReactNode } from "react";

import { Box } from "ink";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <Box paddingX={2} paddingY={1} flexDirection="column">
      {children}
    </Box>
  );
};
