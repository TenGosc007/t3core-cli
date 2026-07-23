import { Box, Text } from "ink";
import { useState } from "react";

import { TextInput } from "../TextInput";

type Props = {
  onSubmit?: (value: string) => void;
};

export const GlobalInput = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <Box
      borderStyle="single"
      borderColor="gray"
      borderLeft={false}
      borderRight={false}
      borderDimColor
      paddingX={1}
      width="100%"
    >
      <Text bold>❯ </Text>
      <TextInput value={query} onChange={setQuery} onSubmit={onSubmit} />
    </Box>
  );
};
