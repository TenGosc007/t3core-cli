import { Text, useWindowSize } from "ink";

import { layoutStyles } from "./layoutStyles";

const header = "Tic Tac Toe";

export const TopLayout = () => {
  const { columns } = useWindowSize();

  const count = columns - header.length - 5;

  return (
    <Text color={layoutStyles.color} backgroundColor={layoutStyles.background}>
      ╭─{" "}
      <Text bold color="yellowBright">
        {header}
      </Text>{" "}
      {"─".repeat(count)}╮
    </Text>
  );
};
