import { Text } from "ink";

type Props = {
  label: string;
  selected: boolean;
};

export const GameModeItem = ({ label, selected }: Props) => {
  return (
    <Text bold={selected} color={selected ? "cyan" : undefined}>
      {label}
    </Text>
  );
};
