import { Box, Text } from "ink";

type Props = {
  label: string;
  index: number;
  selectedIndex: number;
};

export const MenuItem = ({ label, index, selectedIndex }: Props) => {
  return (
    <Box key={label} gap={1}>
      <Text color={index === selectedIndex ? "green" : undefined}>
        {index === selectedIndex ? "❯" : " "}
      </Text>
      <Text
        bold={index === selectedIndex}
        color={index === selectedIndex ? "green" : undefined}
      >
        {label}
      </Text>
    </Box>
  );
};
