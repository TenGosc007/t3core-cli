import { Text } from "ink";
import { memo, useMemo } from "react";

import { BORDER_CHARS } from "../constants";

type BorderType = "top" | "mid" | "bot";

type Props = {
  type: BorderType;
  cols?: number;
};

export const Border = memo(({ type, cols = 3 }: Props) => {
  const chars = BORDER_CHARS[type];
  const dash = "───";

  const middleChars = useMemo(
    () =>
      Array(cols - 1)
        .fill(dash)
        .map((v, i) => (
          <Text key={i}>
            {v}
            {chars.mid}
          </Text>
        )),
    [cols, chars.mid, dash],
  );

  return (
    <Text color="gray">
      {chars.left}
      {middleChars}
      {dash}
      {chars.right}
    </Text>
  );
});
