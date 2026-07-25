import { Box, Text } from "ink";

import { useSettingsStore } from "@/services/settings";

type Props = {
  hints: string[];
};

export const ArrowNavHint = ({ hints }: Props) => {
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  if (!arrowNav) return null;

  return (
    <Box marginTop={2}>
      <Text dimColor>{hints.join(" · ")}</Text>
    </Box>
  );
};
