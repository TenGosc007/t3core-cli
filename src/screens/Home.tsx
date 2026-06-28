import { Box, Text, useApp, useInput } from "ink";

import { ROUTES, useNavigate } from "../navigation";

export const Home = () => {
  const { exit } = useApp();
  const navigate = useNavigate();

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }

    if (key.return) {
      navigate(ROUTES.settings);
    }
    if (input === "g") {
      navigate(ROUTES.game);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="green">
        Home
      </Text>
      <Text>Press Enter to go to Settings, or "q" to quit.</Text>
    </Box>
  );
};
