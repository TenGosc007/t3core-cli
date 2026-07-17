import { Text } from "ink";

import { BORDER_CHARS } from "../constants";

type BorderType = "top" | "mid" | "bot";

type Props = {
  type: BorderType;
  cols?: number;
};

export const Border = ({ type, cols = 3 }: Props) => {
  const chars = BORDER_CHARS[type];
  const dash = "───";

  const middleChars = Array(cols - 1)
    .fill(dash)
    .map((v, i) => (
      <Text key={i}>
        {v}
        {chars.mid}
      </Text>
    ));

  return (
    <Text color="gray">
      {chars.left}

      {middleChars}

      {dash}
      {chars.right}
    </Text>
  );
};
