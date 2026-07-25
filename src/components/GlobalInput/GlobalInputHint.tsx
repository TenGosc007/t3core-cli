import { Box, Text } from "ink";

type Props = {
  hints?: string[];
};

export const GlobalInputHint = ({ hints }: Props) => {
  return (
    <Box paddingX={1} flexDirection="column">
      {hints?.map((hint) => (
        <Text key={hint} dimColor>
          · {hint}
        </Text>
      ))}
    </Box>
  );
};
