import type { ComponentProps } from "react";

import { Box } from "ink";

type Props = ComponentProps<typeof Box>;

export const Container = ({ children, ...props }: Props) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      flexDirection="column"
      width="100%"
      {...props}
    >
      {children}
    </Box>
  );
};
