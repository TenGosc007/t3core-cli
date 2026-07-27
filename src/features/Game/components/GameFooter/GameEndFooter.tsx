import { Box, Text, useInput } from "ink";

type GameEndFooterProps = {
  onSubmit: (value: string) => void;
};

export const GameEndFooter = ({ onSubmit }: GameEndFooterProps) => {
  useInput((input, key) => {
    if (key.return || input === " ") {
      onSubmit("-1");
    }
  });

  return (
    <Box padding={1}>
      <Text dimColor>Enter: play again · q: back to menu</Text>
    </Box>
  );
};
