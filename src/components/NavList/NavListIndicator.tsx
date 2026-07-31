import { Text } from "ink";

type Props = {
  arrowNav?: boolean;
  selected?: boolean;
  number: number;
};

export const NavListIndicator = ({ arrowNav, selected, number }: Props) => {
  if (arrowNav) {
    return (
      <Text color={selected ? "cyan" : undefined}>{selected ? "❯" : " "}</Text>
    );
  }

  return (
    <Text>
      [<Text color="cyan">{number}</Text>]
    </Text>
  );
};
