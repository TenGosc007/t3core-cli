import { useApp, useInput } from "ink";

import { Container } from "@/components/Container";
import { beep } from "@/services/settings";

import { Menu } from "../features/Menu/Menu";

export const Home = () => {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "q") {
      beep();
      exit();
    }
  });

  return (
    <Container>
      <Menu />
    </Container>
  );
};
