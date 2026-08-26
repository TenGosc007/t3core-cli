import { Text, useAnimation } from "ink";

export const Spinner = () => {
  const { frame } = useAnimation({ interval: 80 });
  const characters = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  return <Text>{characters[frame % characters.length]}</Text>;
};
