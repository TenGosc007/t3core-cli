import { Box, Text } from "ink";

export type GlobalInputError = string | string[] | undefined;

type Props = {
  error?: GlobalInputError;
};

export const GlobalInputError = ({ error }: Props) => {
  const errorMessage = errorHelper(error);

  return (
    <Box height={1} paddingX={1}>
      <Text color="red">{errorMessage}</Text>
    </Box>
  );
};

function errorHelper(error: GlobalInputError) {
  return Array.isArray(error) ? error?.join(" · ") : error;
}
