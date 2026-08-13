import { Box, Text } from "ink";

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <Box borderLeft={false} borderRight={false} borderDimColor>
      <Text>
        <Text color="cyan" bold>
          ●
        </Text>{" "}
        <Text underline>{label}</Text>
      </Text>
    </Box>
  );
};
