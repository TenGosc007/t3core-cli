import { Box, Text } from "ink";

type InputErrorProps = {
  error: string | null;
};

export const InputError = ({ error }: InputErrorProps) => {
  return (
    <Box justifyContent="center" marginTop={1}>
      <Text color="red">{error || " "}</Text>
    </Box>
  );
};
