import { Box, Text } from "ink";

export const SettingsHeader = () => {
  return (
    <Box
      borderLeft={false}
      borderRight={false}
      borderStyle="double"
      borderColor="magenta"
      borderDimColor
    >
      <Text bold color="red">
        <Text color="cyan">❯</Text> SETTINGS
      </Text>
    </Box>
  );
};
