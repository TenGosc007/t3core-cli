import { Box } from "ink";
import { type ReactNode } from "react";

import { GlobalInput } from "../GlobalInput";
import { BottomLayout } from "./BottomLayout";
import { layoutStyles } from "./layoutStyles";
import { TopLayout } from "./TopLayout";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <TopLayout />
      <Box
        borderStyle="round"
        borderColor={layoutStyles.color}
        borderTop={false}
        borderBottom={false}
        backgroundColor={layoutStyles.background}
        borderBackgroundColor={layoutStyles.background}
        flexDirection="column"
      >
        {children}
        <GlobalInput />
      </Box>
      <BottomLayout />
    </>
  );
};
