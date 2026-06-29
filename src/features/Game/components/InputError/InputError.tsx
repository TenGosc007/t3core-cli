import { Box, Text } from "ink";

type InputErrorProps = {
  error: string | null;
};

export const InputError = ({ error }: InputErrorProps) => {
  if (error == null) {
    return null;
  }

  return (
    <Box marginTop={1}>
      <Text color="red">{error}</Text>
    </Box>
  );
};
