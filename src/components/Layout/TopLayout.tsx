import { Text, useWindowSize } from "ink";

import { layoutStyles } from "./layoutStyles";

const header = " Tic Tac Toe ";

export const TopLayout = () => {
  const { columns } = useWindowSize();

  const count = columns - header.length - 2;

  return (
    <Text color={layoutStyles.color} backgroundColor={layoutStyles.background}>
      ╭{"─".repeat(count / 2)}
      <Text bold color="yellowBright">
        {header}
      </Text>
      {"─".repeat(count / 2)}╮
    </Text>
  );
};
