import { Box, Text } from "ink";

type Props = {
  label: string;
  selected: boolean;
  arrowKeyNavigation: boolean;
  index: number;
};

export const MenuItem = ({
  label,
  selected,
  arrowKeyNavigation,
  index,
}: Props) => {
  return (
    <Box key={label} gap={1}>
      <Text color={selected ? "cyan" : undefined}>{selected ? "❯" : " "}</Text>
      {!arrowKeyNavigation && (
        <Text>
          [<Text color="cyan">{index + 1}</Text>]
        </Text>
      )}
      <Text bold={selected} color={selected ? "cyan" : undefined}>
        {label}
      </Text>
    </Box>
  );
};
