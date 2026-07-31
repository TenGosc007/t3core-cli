import { Text } from "ink";

type Props = {
  arrowNav?: boolean;
  selected?: boolean;
  number: number;
  color?: string;
};

export const NavListIndicator = ({
  arrowNav,
  selected,
  number,
  color = "cyan",
}: Props) => {
  if (arrowNav) {
    return (
      <Text color={selected ? color : undefined}>{selected ? "❯" : " "}</Text>
    );
  }

  return (
    <Text>
      [<Text color={color}>{number}</Text>]
    </Text>
  );
};
