import { Box, Text } from "ink";
import { type z } from "zod";

import { useExitConfirm } from "@/hooks/useExitConfirm";
import { useSettingsArrowNav } from "@/services/settings";

import { ArrowNavHint } from "../ArrowNavHint";
import { GlobalInput } from "../GlobalInput";

type Props = {
  onSubmit: (value: string) => void;
  hints?: string[];
  arrowNavHints?: string[];
  validationSchema?: z.ZodType<unknown>;
};

export const Footer = ({
  onSubmit,
  hints,
  validationSchema,
  arrowNavHints,
}: Props) => {
  const arrowNav = useSettingsArrowNav();
  const { confirming } = useExitConfirm();

  if (confirming) {
    return (
      <Box padding={1}>
        <Text bold>
          Are you sure you want to quit? <Text underline>Y</Text>/N
        </Text>
      </Box>
    );
  }

  if (arrowNav) {
    return <ArrowNavHint hints={arrowNavHints} />;
  }

  return (
    <GlobalInput
      onSubmit={onSubmit}
      hints={hints}
      validationSchema={validationSchema}
    />
  );
};
