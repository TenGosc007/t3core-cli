import { Box, Text } from "ink";

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <Box borderLeft={false} borderRight={false} borderDimColor>
      <Text bold>
        <Text color="cyan">❯</Text> {label}
      </Text>
    </Box>
  );
};
