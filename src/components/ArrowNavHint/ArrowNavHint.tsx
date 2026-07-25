import { Box, Text } from "ink";

import { useSettingsStore } from "@/services/settings";

type Props = {
  hints?: string[];
};

export const ArrowNavHint = ({ hints }: Props) => {
  const arrowNav = useSettingsStore((s) => s.arrowNav);

  if (!arrowNav || !hints) return null;

  return (
    <Box margin={1}>
      <Text dimColor>{hints.join(" · ")}</Text>
    </Box>
  );
};
