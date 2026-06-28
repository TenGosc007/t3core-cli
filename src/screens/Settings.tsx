import { Box, Text, useInput } from "ink";

import { ROUTES, useNavigate } from "../navigation";

export const Settings = () => {
  const navigate = useNavigate();

  useInput((_, key) => {
    if (key.return) {
      navigate(ROUTES.home);
    }
  });

  return (
    <Box>
      <Text>Settings</Text>
      <Text>Press Enter to go back to Menu</Text>
    </Box>
  );
};
