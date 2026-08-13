import { Text } from "ink";

type InputErrorProps = {
  error: string | null;
};

export const InputError = ({ error }: InputErrorProps) => {
  return <Text color="red">{error}</Text>;
};
