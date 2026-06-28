import { Box, Text } from "ink";

type Props = {
  label: string;
  selected: boolean;
};

export const MenuItem = ({ label, selected }: Props) => {
  return (
    <Box key={label} gap={1}>
      <Text color={selected ? "green" : undefined}>{selected ? "❯" : " "}</Text>
      <Text bold={selected} color={selected ? "green" : undefined}>
        {label}
      </Text>
    </Box>
  );
};
